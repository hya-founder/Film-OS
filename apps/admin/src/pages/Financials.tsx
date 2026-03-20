import React from 'react';
import styles from '../styles/Financials.module.css';

const Financials = () => {
  const projectBreakdown = [
    { title: 'The Lab', profit: '₱180,000', margin: '40%' },
    { title: 'Neon Manila', profit: '₱120,000', margin: '35%' },
    { title: 'Vogue Summer', profit: '₱150,000', margin: '45%' },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <div className={styles.labelGroup}>
            <span className={styles.label}>Financial Overview</span>
            <h1 className={styles.totalHeader}>₱450,000</h1>
          </div>
        </header>

        {/* 1. The Pulse Row (Top Stats) */}
        <div className={styles.pulseRow}>
          <div className={styles.statItem}>
            <span className={styles.label}>Revenue</span>
            <span className={styles.statValue}>₱1.2M</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.statItem}>
            <span className={styles.label}>Expenses</span>
            <span className={styles.statValue}>₱750K</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.statItem}>
            <span className={styles.label}>Net Profit</span>
            <span className={styles.statValue}>₱450K</span>
          </div>
        </div>

        {/* 2. Profitability List (Project Breakdown) */}
        <div className={styles.section}>
          <span className={`${styles.label} opacity-30 mb-6 block`}>Project Breakdown</span>
          <div className={styles.projectList}>
            {projectBreakdown.map((proj, i) => (
              <div key={i} className={styles.projectCard}>
                <div className={styles.titleInfo}>
                  <h3 className={styles.projectTitle}>{proj.title}</h3>
                </div>
                <div className={styles.financialInfo}>
                  <span className={styles.profitValue}>{proj.profit}</span>
                  <span className={styles.marginPill}>{proj.margin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financials;
