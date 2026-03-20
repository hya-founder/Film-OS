import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import styles from '../styles/FinancialsOverview.module.css';

const FinancialsOverview = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const projectPL = [
    { title: 'AYALA LAND PREMIER', profit: '₱180,000', margin: '40%' },
    { title: 'THE LAB', profit: '₱120,000', margin: '35%' },
    { title: 'NEON MANILA', profit: '₱150,000', margin: '45%' },
  ];

  const equipmentROI = [
    { asset: 'ALEXA MINI LF', revenue: '₱45,000', utilization: '85%' },
    { asset: 'COOKE ANAMORPHIC SET', revenue: '₱32,000', utilization: '60%' },
    { asset: 'DJI RONIN 2', revenue: '₱12,000', utilization: '40%' },
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
          <div className={styles.spacer} />
          <h1 className={styles.mainTitle}>FINANCIALS</h1>
          <button 
            className={`${styles.iconButton} ${isCalendarOpen ? styles.iconButtonActive : ''}`}
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          >
            <CalendarIcon size={20} strokeWidth={1.5} />
          </button>
        </header>

        {/* The Pulse (Top Panel) */}
        <section className={styles.pulsePanel}>
          <div className={styles.pulseStat}>
            <span className={styles.labelMuted}>TOTAL REVENUE</span>
            <div className={styles.statGroup}>
              <h2 className={styles.serifNumber}>₱1.2M</h2>
              <svg className={styles.sparkline} viewBox="0 0 100 20">
                <path d="M0,15 Q25,5 50,15 T100,10" fill="none" stroke="#3a03dd" strokeWidth="1" />
              </svg>
            </div>
          </div>
          <div className={styles.pulseStat}>
            <span className={styles.labelMuted}>COLLECTED</span>
            <div className={styles.statGroup}>
              <h2 className={styles.serifNumber}>₱750k</h2>
              <svg className={styles.sparkline} viewBox="0 0 100 20">
                <path d="M0,10 Q25,15 50,5 T100,12" fill="none" stroke="#3a03dd" strokeWidth="1" />
              </svg>
            </div>
          </div>
          <div className={styles.pulseStat}>
            <span className={styles.labelMuted}>PROJECTED</span>
            <div className={styles.statGroup}>
              <h2 className={styles.serifNumber}>₱450k</h2>
              <svg className={styles.sparkline} viewBox="0 0 100 20">
                <path d="M0,18 Q25,12 50,18 T100,5" fill="none" stroke="#3a03dd" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </section>

        {/* Highlight: Overdue Payments */}
        <div className={styles.overdueHighlight}>
          <div className={styles.overduePill}>
            <div className={styles.cobaltDot} />
            <span className={styles.label}>OVERDUE PAYMENTS: CLIENT NAME - 14 DAYS</span>
          </div>
        </div>

        {/* Project P&L List */}
        <section className={styles.section}>
          <span className={`${styles.label} opacity-30 mb-6 block`}>PROJECT P&L</span>
          <div className={styles.projectList}>
            {projectPL.map((proj, i) => (
              <div key={i} className={styles.projectCard}>
                <div className={styles.titleInfo}>
                  <h3 className={styles.projectTitle}>{proj.title}</h3>
                </div>
                <div className={styles.financialInfo}>
                  <span className={styles.profitBold}>{proj.profit}</span>
                  <div className={styles.marginPill}>
                    {proj.margin}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Equipment ROI Table */}
        <section className={styles.section}>
          <span className={`${styles.label} opacity-30 mb-6 block`}>EQUIPMENT ROI</span>
          <div className={styles.tableContainer}>
            <table className={styles.roiTable}>
              <thead>
                <tr>
                  <th>ASSET</th>
                  <th>REVENUE</th>
                  <th>UTILIZATION %</th>
                </tr>
              </thead>
              <tbody>
                {equipmentROI.map((item, i) => (
                  <tr key={i}>
                    <td>{item.asset}</td>
                    <td>{item.revenue}</td>
                    <td>{item.utilization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Billing Pipeline */}
        <section className={styles.section}>
          <span className={`${styles.label} opacity-30 mb-6 block`}>BILLING PIPELINE</span>
          <div className={styles.pipelineList}>
            {billingPipeline.map((pipe, i) => (
              <div key={i} className={styles.pipelineCard}>
                <span className={styles.projectMiniTitle}>{pipe.project}</span>
                <div className={styles.progressTrack}>
                  <div className={`${styles.trackNode} ${pipe.status === 'DEPOSIT' || pipe.status === 'BALANCE' || pipe.status === 'PAID' ? styles.trackNodeActive : ''}`}>
                    <span className={styles.nodeLabel}>DEPOSIT</span>
                  </div>
                  <div className={styles.trackLine} />
                  <div className={`${styles.trackNode} ${pipe.status === 'BALANCE' || pipe.status === 'PAID' ? styles.trackNodeActive : ''}`}>
                    <span className={styles.nodeLabel}>BALANCE</span>
                  </div>
                  <div className={styles.trackLine} />
                  <div className={`${styles.trackNode} ${pipe.status === 'PAID' ? styles.trackNodeActive : ''}`}>
                    <span className={styles.nodeLabel}>PAID</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FinancialsOverview;
