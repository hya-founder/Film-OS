import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import styles from '../styles/AdminFinancials.module.css';

const AdminFinancials = () => {
  const projectPL = [
    { title: 'AYALA LAND PREMIER', profit: '₱180,000', margin: '40%' },
    { title: 'THE LAB', profit: '₱120,000', margin: '35%' },
    { title: 'NEON MANILA', profit: '₱150,000', margin: '45%' },
  ];

  const expenses = [
    { category: 'STAFF PAYROLL', value: '₱240,000' },
    { category: 'EQUIPMENT RENTAL', value: '₱85,000' },
    { category: 'POST-PRODUCTION', value: '₱45,000' },
    { category: 'MARKETING', value: '₱12,000' },
  ];

  const billingPipeline = [
    { project: 'THE LAB', status: 'BALANCE' },
    { project: 'NEON MANILA', status: 'DEPOSIT' },
    { project: 'VOGUE SUMMER', status: 'PAID' },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <h1 className={styles.mainTitle}>Financials</h1>
          <button className={styles.iconButton}>
            <CalendarIcon size={24} strokeWidth={1} />
          </button>
        </header>

        {/* 1. Top Metric Cards (The Pulse) */}
        <section className={styles.pulsePanel}>
          <div className={styles.pulseStat}>
            <span className={styles.labelMuted}>TOTAL REVENUE</span>
            <h2 className={styles.serifNumber}>₱1.4M</h2>
          </div>
          <div className={styles.pulseStat}>
            <span className={styles.labelMuted}>COLLECTED</span>
            <h2 className={styles.serifNumber}>₱900K</h2>
          </div>
          <div className={styles.pulseStat} style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
            <span className={styles.labelMuted} style={{ opacity: 0.4, color: '#FFFFFF' }}>PENDING RESERVED</span>
            <h2 className={styles.serifNumber} style={{ color: '#FFFFFF' }}>12</h2>
          </div>
        </section>

        {/* 2. Project-Level P&L */}
        <section className={styles.section}>
          <span className={styles.labelMuted}>PROJECT P&L</span>
          <div className={styles.projectList}>
            {projectPL.map((proj, i) => (
              <div key={i} className={styles.projectCard}>
                <h3 className={styles.projectTitle}>{proj.title}</h3>
                <div className={styles.financialInfo}>
                  <span className={styles.profitBold}>{proj.profit}</span>
                  <span className={styles.marginPill}>{proj.margin}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-24">
          {/* 3. Expenses Overview */}
          <section className={styles.section}>
            <span className={styles.labelMuted}>EXPENSES OVERVIEW</span>
            <div className={styles.twoColumnList}>
              {expenses.map((item, i) => (
                <div key={i} className={styles.listItem}>
                  <span className={styles.itemLabel}>{item.category}</span>
                  <span className={styles.itemValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Path to Cash (Billing Pipeline) */}
          <section className={styles.section}>
            <span className={styles.labelMuted}>PATH TO CASH</span>
            <div className={styles.pipelineList} style={{ marginTop: '24px' }}>
              {billingPipeline.map((pipe, i) => (
                <div key={i} className={styles.pipelineItem}>
                  <span className={styles.projectMiniTitle}>{pipe.project}</span>
                  <div className={styles.statusGroup}>
                    <div className={`${styles.statusPill} ${pipe.status === 'DEPOSIT' ? styles.statusPillActive : (pipe.status === 'PAID' || pipe.status === 'BALANCE' ? styles.statusPillActive : styles.statusPillMuted)}`}>
                      DEP
                    </div>
                    <div className={`${styles.statusPill} ${pipe.status === 'BALANCE' ? styles.statusPillActive : (pipe.status === 'PAID' ? styles.statusPillActive : styles.statusPillMuted)}`}>
                      BAL
                    </div>
                    <div className={`${styles.statusPill} ${pipe.status === 'PAID' ? styles.statusPillActive : styles.statusPillMuted}`}>
                      PAID
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminFinancials;
