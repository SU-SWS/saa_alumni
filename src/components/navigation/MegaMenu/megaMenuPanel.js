import React, { useState, useEffect, useRef, useContext } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../../utilities/createBloks';
import useEscape from '../../../hooks/useEscape';
import { FlexBox } from '../../layout/FlexBox';
import { Container } from '../../layout/Container';
import { isExpanded, isBrowser } from '../../../utilities/menuHelpers';
import { ModalContext } from '../../layout/Modal/ModalContext';
import * as styles from './megaMenuPanel.styles';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const MegaMenuPanel = ({
  blok: { linkText, linkGroups, sectionCtaLink, card },
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

  const handleClose = () => {
    if (panelOpened) {
      ref.current.focus();
      setPanelOpened(false);
    }
  };

  useEscape(() => {
    if (parentRef.current && isExpanded(parentRef.current)) {
      handleClose();
      parentRef.current.focus();
    }
  });
  useOnClickOutside(ref, () => setPanelOpened(false));

  let isActiveButton;

  if (isBrowser) {
    const browserUrl = window.location.href;

    // Loop through children menu items and add active styles to parent button if any childrem items are active
    for (let i = 0; i < linkGroups.length; i += 1) {
      if (browserUrl.includes(linkGroups[i].link?.cached_url)) {
        isActiveButton = true;
      }
    }
  }

  return (
    <SbEditable content={blok}>
      <li className={styles.root({ isHomesite: true })} ref={ref}>
        <button
          type="button"
          aria-expanded={panelOpened}
          onClick={togglePanel}
          className={styles.parentButton({
            panelOpened,
            isActiveButton,
            isHomesite: true,
          })}
        >
          {linkText}
          <ChevronDownIcon
            className={styles.chevron({ panelOpened, isActiveButton })}
            aria-hidden="true"
          />
        </button>
        <div
          className={styles.childMenu({
            panelOpened,
            isHomesite: true,
          })}
          aria-hidden={!panelOpened}
        >
          <Container width="site" className="su-rs-pt-4 su-rs-pb-5">
            <FlexBox direction="row" gap>
              <FlexBox direction="col">
                <FlexBox direction="row" gap>
                  <CreateBloks blokSection={linkGroups} />
                </FlexBox>
                <CreateBloks blokSection={sectionCtaLink} />
              </FlexBox>
              {card && <CreateBloks blokSection={card} />}
            </FlexBox>
          </Container>
        </div>
      </li>
    </SbEditable>
  );
};

export default MegaMenuPanel;
