import React from 'react';
import { SrOnlyText } from 'decanter-react';
import { StanfordLogo } from '../StanfordLogo/StanfordLogo';
import * as styles from './GlobalFooter.styles';

/**
 * Stanford Global Footer Component.
 * This is the SAA shared version which always has the SAA Black background color.
 *
 */

export const GlobalFooter = () => (
  <div className={styles.root}>
    <div className={styles.wrapper} title="Common Stanford resources">
      <div className={styles.logoWrapper}>
        <StanfordLogo className={styles.logo} type="stacked" />
      </div>
      <div className={styles.contentWrapper}>
        <nav aria-label="global footer menu" className={styles.nav}>
          <ul className={styles.primaryMenu}>
            <li className={styles.primaryMenuListItem}>
              <a
                href="https://www.stanford.edu"
                className={styles.primaryMenuLink}
              >
                Stanford Home
                <SrOnlyText />
              </a>
            </li>
            <li className={styles.primaryMenuListItem}>
              <a
                href="https://visit.stanford.edu/plan/"
                className={styles.primaryMenuLink}
              >
                Maps &amp; Directions
                <SrOnlyText />
              </a>
            </li>
            <li className={styles.primaryMenuListItem}>
              <a
                href="https://www.stanford.edu/search/"
                className={styles.primaryMenuLink}
              >
                Search Stanford
                <SrOnlyText />
              </a>
            </li>
            <li>
              <a
                href="https://emergency.stanford.edu"
                className={styles.primaryMenuLink}
              >
                Emergency Info
                <SrOnlyText />
              </a>
            </li>
          </ul>
          <ul className={styles.secondaryMenu}>
            <li className={styles.secondaryMenuListItem}>
              <a
                href="https://www.stanford.edu/site/terms/"
                title="Terms of use for sites"
                className={styles.secondaryMenuLink}
              >
                Terms of Use
                <SrOnlyText />
              </a>
            </li>
            <li className={styles.secondaryMenuListItem}>
              <a
                href="https://www.stanford.edu/site/privacy/"
                title="Privacy and cookie policy"
                className={styles.secondaryMenuLink}
              >
                Privacy
                <SrOnlyText />
              </a>
            </li>
            <li className={styles.secondaryMenuListItem}>
              <a
                href="https://uit.stanford.edu/security/copyright-infringement"
                title="Report alleged copyright infringement"
                className={styles.secondaryMenuLink}
              >
                Copyright
                <SrOnlyText />
              </a>
            </li>
            <li className={styles.secondaryMenuListItem}>
              <a
                href="https://adminguide.stanford.edu/chapter-1/subchapter-5/policy-1-5-4"
                title="Ownership and use of Stanford trademarks and images"
                className={styles.secondaryMenuLink}
              >
                Trademarks
                <SrOnlyText />
              </a>
            </li>
            <li className={styles.secondaryMenuListItem}>
              <a
                href="https://bulletin.stanford.edu/pages/c7vDgeOuJIfpZe8GKmW3"
                title="Non-discrimination policy"
                className={styles.secondaryMenuLink}
              >
                Non-Discrimination
                <SrOnlyText />
              </a>
            </li>
            <li>
              <a
                href="https://www.stanford.edu/site/accessibility"
                title="Report web accessibility issues"
                className={styles.secondaryMenuLink}
              >
                Accessibility
                <SrOnlyText />
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.copyrightWrapper}>
          <span className={styles.copyright}>&copy; Stanford University.</span>
          <span className={styles.copyright}>
            &nbsp; Stanford, California 94305.
          </span>
        </div>
      </div>
    </div>
  </div>
);
