import React, { useState, useEffect, useRef, useContext } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../../utilities/createBloks';
import useEscape from '../../../hooks/useEscape';
import { Container } from '../../layout/Container';
import { isExpanded, isBrowser } from '../../../utilities/menuHelpers';
import { ModalContext } from '../../layout/Modal/ModalContext';
import * as styles from './megaMenuPanel.styles';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { Grid } from '../../layout/Grid';
import { GridCell } from '../../layout/GridCell';

const MegaMenuPanel = ({
  blok: { parentText, parentTextSecond, linkGroups, sectionCtaLink, fourthCol },
  blok,
}) => {
  const [panelOpened, setPanelOpened] = useState(false);
  const ref = useRef();
  const parentRef = useRef(null);

  const { setUpdateModal } = useContext(ModalContext);

  useEffect(() => {
    if (setUpdateModal) {
      setUpdateModal(true);
    }
  }, [panelOpened, setUpdateModal]);

  const togglePanel = () => {
    setPanelOpened(!panelOpened);
  };

  // Close dropdown if escape key is pressed and return focus to the parent item button
  useEscape(() => {
    if (parentRef.current && isExpanded(parentRef.current)) {
      setPanelOpened(false);
      parentRef.current.focus();
    }
  });

  useOnClickOutside(ref, () => setPanelOpened(false));

  let isActiveButton;

  if (isBrowser) {
    const browserUrl = window.location.pathname;

    // Loop through children menu items and add active styles to parent button if any childrem items are active
    for (let i = 0; i < linkGroups.length; i += 1) {
      if (Object.keys(linkGroups[i]).includes('links')) {
        for (let j = 0; j < linkGroups[i].links.length; j += 1) {
          if (
            linkGroups[i].links[j].link?.cached_url &&
            browserUrl.includes(linkGroups[i].links[j].link.cached_url)
          ) {
            isActiveButton = true;
          }
        }
      }
      if (
        linkGroups[i].secondaryLink?.cached_url &&
        browserUrl.includes(linkGroups[i].secondaryLink.cached_url)
      ) {
        isActiveButton = true;
      }
    }
  }

  return (
    <SbEditable content={blok}>
      <li className={styles.root} ref={ref}>
        <button
          type="button"
          onClick={togglePanel}
          aria-expanded={panelOpened}
          ref={parentRef}
          className={styles.parentButton({
            panelOpened,
            isActiveButton,
          })}
        >
          {parentText}
          {parentTextSecond && (
            <>
              <br className={styles.parentTextLinebreak} />
              {parentTextSecond}
            </>
          )}
          <ChevronDownIcon
            className={styles.chevron({ panelOpened, isActiveButton })}
            aria-hidden="true"
          />
        </button>
        <div
          className={styles.childMenu({
            panelOpened,
          })}
          aria-hidden={!panelOpened}
        >
          <div className="su-absolute su-top su-w-full su-h-20 lg:su-h-30 su-from-black-20 lg:su-from-black-30 su-to-fog-light lg:su-to-white su-bg-gradient-to-b su-z-[100]" />
          <div className="su-px-26 lg:su-cc su-rs-pt-4 su-rs-pb-5 su-z-50">
            <Grid lg={12} gap>
              <GridCell lg={fourthCol.length > 0 ? 8 : 12}>
                <Grid lg={12} gap>
                  <CreateBloks blokSection={linkGroups} />
                </Grid>
                <div className="su-rs-mt-4">
                  <CreateBloks blokSection={sectionCtaLink} />
                </div>
              </GridCell>
              {fourthCol.length > 0 && (
                <GridCell lg={4}>
                  <CreateBloks blokSection={fourthCol} />
                </GridCell>
              )}
            </Grid>
          </div>
        </div>
      </li>
    </SbEditable>
  );
};

export default MegaMenuPanel;
