import { convertToRaw } from 'draft-js';
import { ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { FC, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';

import { EventFields } from '@features/event-form';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface Props {
  field: ControllerRenderProps<EventFields, 'description'>;
}

export const WysiwygEditor: FC<Props> = ({ field: { value, onChange } }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [updated, setUpdated] = useState(false);

  const onEditorStateChange = (editorState: EditorState) => {
    setUpdated(true);
    setEditorState(editorState);

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  useEffect(() => {
    if (!updated) {
      const defaultValue = value && value !== 'undefined' ? value : '';
      const blocksFromHtml = htmlToDraft(defaultValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value]);

  return (
    <Editor
      toolbar={{
        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history']
      }}
      editorState={editorState}
      wrapperClassName="wrapper-class border-1 bg-white rounded-md"
      editorClassName="editor-class h-32"
      onEditorStateChange={onEditorStateChange}
    />
  );
};
