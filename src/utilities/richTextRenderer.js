import React from "react";
import { render, MARK_BOLD, MARK_ITALIC, NODE_HEADING } from 'storyblok-rich-text-react-renderer';
import { Heading } from "decanter-react";

const RichTextRenderer = ({wysiwyg}) => {
  return (
    <div className='su-wysiwyg'>
      {render(wysiwyg, {
        markResolvers: {
          [MARK_BOLD]: (children) => <strong>{children}</strong>,
          [MARK_ITALIC]: (children) => <em>{children}</em>
        },
        nodeResolvers: {
          [NODE_HEADING]: (children, props) => {
            const { level } = props;

            if (level === 2) {
              return <Heading level={2} font='serif' size={3}>{children}</Heading>;
            }
            else if (level === 3) {
              return <Heading level={3} font='serif' size={2}>{children}</Heading>;
            }
            else if (level === 4) {
              return <Heading level={4} font='serif' size={1}>{children}</Heading>;
            }
            else if (level === 5) {
              return <Heading level={5} font='serif' size={0}>{children}</Heading>;
            }
          }
        }
      })}
    </div>
  );
};

export default RichTextRenderer;
