import React, { useState } from "react";
import SbEditable from "storyblok-react";
import { Container, FlexBox, FlexCell } from "decanter-react";
import { dcnb } from "cnbuilder";
import CreateBloks from "../../utilities/createBloks";
import Logo from "./logo";
import OpenSearchModalButton from "../search/openSearchModalButton";
import SearchModal from "../search/searchModal";

const Masthead = ({ blok: { mainNav, utilityNav }, blok, hasHero, isDark }) => {
  const [modalOpen, setModalOpen] = useState(false);

  let mainNavBgColorXl =
    "xl:su-bg-transparent xl:su-bg-gradient-to-b xl:su-from-masthead-black-top xl:su-to-masthead-black-bottom su-backface-hidden";
  let mainNavBgColorLg =
    "su-bg-transparent su-bg-gradient-to-b su-from-masthead-black-top su-to-masthead-black-bottom su-backface-hidden";

  if (isDark && !hasHero) {
    mainNavBgColorXl = "xl:su-bg-saa-black";
    mainNavBgColorLg = "su-bg-saa-black";
  }

  return (
    <SbEditable content={blok}>
      <Container
        width="full"
        className="masthead-mobile su-relative lg:su-hidden su-bg-cardinal-red-xdark"
      >
        <nav
          aria-label="Utility Menu"
          className="su-w-full su-text-right su-bg-digital-red"
        >
          <ul className="su-cc su-list-unstyled su-inline-block su-link-white su-link-no-underline su-link-regular su-text-13 xs:su-text-14 sm:su-text-16 children:su-inline-block children:su-ml-[1.6em] xs:children:su-ml-[1.9em] children:su-mb-0 children:su-leading-[4rem] su-underline-offset">
            <CreateBloks
              blokSection={utilityNav}
              className="first:su-ml-0"
              hasExternalIcon
            />
          </ul>
        </nav>
        <FlexBox className="su-cc" alignItems="center">
          <FlexCell className="su-flex su-items-center su-rs-py-1">
            <Logo className="su-w-[18rem]" />
          </FlexCell>
          <OpenSearchModalButton
            openOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
          <CreateBloks blokSection={mainNav} className="su-flex-shrink-0" />
        </FlexBox>
      </Container>
      <Container
        className={`masthead-desktop su-hidden lg:su-block ${
          hasHero ? "su-absolute" : "su-relative"
        }  su-z-20`}
        width="full"
      >
        <FlexBox>
          <FlexCell
            shrink={false}
            className="su-flex su-items-center lg:su-px-30 xl:su-items-end xl:su-pl-61 xl:su-pr-45 2xl:su-pr-45 2xl:su-pl-61 3xl:su-cc 3xl:su-pr-70 xl:su-pb-38 su-ml-0 su-bg-gradient-to-b su-to-digital-red su-from-cardinal-red"
          >
            <Logo className="su-w-[18rem] lg:su-w-[20rem] xl:su-w-[19vw] 2xl:su-w-[26rem]" />
          </FlexCell>
          <FlexCell
            grow
            className={dcnb(
              "su-flex su-flex-col lg:su-pr-30 xl:su-pr-[6rem] 2xl:su-pr-61 3xl:su-cc lg:su-pl-0 xl:su-pl-30 3xl:su-pl-61 su-bg-cardinal-red-xdark xl:su-border-b xl:su-border-solid xl:su-border-black-90",
              mainNavBgColorXl
            )}
          >
            <FlexBox
              direction="row"
              className="su-rs-my-0 xl:su-mb-0 su-flex-grow"
            >
              <nav
                aria-label="Utility Menu"
                className="su-inline-block su-text-right su-flex-grow"
              >
                <ul className="su-list-unstyled su-inline-block su-link-white su-link-no-underline su-link-regular su-text-18 children:su-inline-block children:su-leading-[3.4rem] children:su-mr-[2em] children:su-mb-0 su-underline-offset">
                  <CreateBloks
                    blokSection={utilityNav}
                    className="first:su-ml-0 children:hocus:su-underline-digital-red-xlight children:hocus:su-underline-thick"
                    hasExternalIcon
                  />
                </ul>
              </nav>
              <OpenSearchModalButton
                openOpen={modalOpen}
                setModalOpen={setModalOpen}
              />
            </FlexBox>
            <CreateBloks
              blokSection={mainNav}
              className="su-hidden lg:su-hidden xl:su-flex xl:su-mt-12 2xl:su-mt-27"
            />
          </FlexCell>
        </FlexBox>
        <CreateBloks
          blokSection={mainNav}
          className={dcnb(
            "lg:su-flex xl:su-hidden su-rs-pt-1 su-pr-20 su-border-b su-border-solid su-border-black-90",
            mainNavBgColorLg
          )}
        />
      </Container>
      <SearchModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </SbEditable>
  );
};

export default Masthead;
