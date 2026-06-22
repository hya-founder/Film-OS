/**
 * Logic Bridge: Check if all equipment for a package is available on a given date.
 * Uses Supabase to query conflicts with existing bookings and maintenance status.
 */
export const checkPackageAvailability = async (supabase, packageId, requestedDate) => {
  try {
    // 1. Fetch requirements for the package
    const { data: requirements, error: reqError } = await supabase
      .from('package_requirements')
      .select('equipment_id')
      .eq('package_id', packageId);

    if (reqError) throw reqError;
    if (!requirements || requirements.length === 0) return { available: true };

    const equipmentIds = requirements.map(r => r.equipment_id);

    // 2. Find overlapping bookings for these equipment items
    const { data: conflicts, error: conflictError } = await supabase
      .from('booking_equipment')
      .select(`
        equipment_id,
        bookings!inner(start_date, end_date)
      `)
      .in('equipment_id', equipmentIds)
      .lte('bookings.start_date', requestedDate)
      .gte('bookings.end_date', requestedDate);

    if (conflictError) throw conflictError;

    // 3. Find items currently under maintenance
    const { data: maintenance, error: maintError } = await supabase
      .from('equipment')
      .select('id')
      .in('id', equipmentIds)
      .eq('status', 'Maintenance');

    if (maintError) throw maintError;

    const conflictIds = conflicts?.map(c => c.equipment_id) || [];
    const maintenanceIds = maintenance?.map(m => m.id) || [];
    const unavailableIds = [...new Set([...conflictIds, ...maintenanceIds])];

    return {
      available: unavailableIds.length === 0,
      unavailableItems: unavailableIds,
    };
  } catch (error) {
    console.error('Availability Check Error:', error);
    return { available: false, error };
  }
};
