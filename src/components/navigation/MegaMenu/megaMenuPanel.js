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
  blok: { parentText, parentTextSecond, linkGroups, sectionCtaLink, card },
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
          <Container width="site" className="su-rs-pt-4 su-rs-pb-5">
            <Grid lg={12} gap>
              <GridCell lg={card.length > 0 ? 9 : 12}>
                <Grid lg={card.length > 0 ? 9 : 12} gap>
                  <CreateBloks
                    blokSection={linkGroups}
                    onlyLinks={card.length === 0}
                  />
                </Grid>
                <div className="su-rs-mt-4">
                  <CreateBloks blokSection={sectionCtaLink} />
                </div>
              </GridCell>
              {card.length > 0 && (
                <GridCell lg={3}>
                  <CreateBloks blokSection={card} />
                </GridCell>
              )}
            </Grid>
          </Container>
        </div>
      </li>
    </SbEditable>
  );
};

export default MegaMenuPanel;
