/* eslint-disable check-file/filename-naming-convention */

import * as React from 'react';

import { Typography } from '@strapi/design-system';
import { Bold, Italic, Underline, StrikeThrough, Code } from '@strapi/icons';
import { type MessageDescriptor } from 'react-intl';
import { Editor, Text, Transforms } from 'slate';
import styled, { css } from 'styled-components';

import { useBlocksEditorContext } from '../BlocksEditor';

const stylesToInherit = css`
  font-size: inherit;
  color: inherit;
  line-height: inherit;
`;

const BoldText = styled(Typography).attrs({ fontWeight: 'bold' })`
  ${stylesToInherit}
`;

const ItalicText = styled(Typography)`
  font-style: italic;
  ${stylesToInherit}
`;

const UnderlineText = styled(Typography).attrs({ textDecoration: 'underline' })`
  ${stylesToInherit}
`;

const StrikeThroughText = styled(Typography).attrs({ textDecoration: 'line-through' })`
  ${stylesToInherit}
`;

const InlineCode = styled.code`
  background-color: ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => `0 ${theme.spaces[2]}`};
  font-family: 'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', Menlo, Consolas,
    monospace;
  color: inherit;
`;

type ModifierKey = Exclude<keyof Text, 'type' | 'text'>;

type ModifiersStore = {
  [K in ModifierKey]: {
    icon: React.ComponentType;
    isValidEventKey: (event: React.KeyboardEvent<HTMLElement>) => boolean;
    label: MessageDescriptor;
    checkIsActive: () => boolean;
    handleToggle: () => void;
    renderLeaf: (children: React.JSX.Element | string) => React.JSX.Element;
  };
};

/**
 * Manages a store of all the available modifiers.
 */
function useModifiersStore(): ModifiersStore {
  const { editor } = useBlocksEditorContext('useModifiersStore');
  const modifiers = Editor.marks(editor);

  /**
   * The default handler for checking if a modifier is active
   *
   * @param {string} name - The name of the modifier to check
   */
  const baseCheckIsActive = (name: ModifierKey) => {
    if (!modifiers) return false;

    return Boolean(modifiers[name]);
  };

  /**
   * The default handler for toggling a modifier
   */
  const baseHandleToggle = (name: ModifierKey) => {
    // If there is no selection, set selection to the end of line
    if (!editor.selection) {
      const endOfEditor = Editor.end(editor, []);
      Transforms.select(editor, endOfEditor);
    }
    if (modifiers?.[name]) {
      Editor.removeMark(editor, name);
    } else {
      Editor.addMark(editor, name, true);
    }
  };

  return {
    bold: {
      icon: Bold,
      isValidEventKey: (event) => event.key === 'b',
      label: { id: 'components.Blocks.modifiers.bold', defaultMessage: 'Bold' },
      checkIsActive: () => baseCheckIsActive('bold'),
      handleToggle: () => baseHandleToggle('bold'),
      renderLeaf: (children) => <BoldText>{children}</BoldText>,
    },
    italic: {
      icon: Italic,
      isValidEventKey: (event) => event.key === 'i',
      label: { id: 'components.Blocks.modifiers.italic', defaultMessage: 'Italic' },
      checkIsActive: () => baseCheckIsActive('italic'),
      handleToggle: () => baseHandleToggle('italic'),
      renderLeaf: (children) => <ItalicText>{children}</ItalicText>,
    },
    underline: {
      icon: Underline,
      isValidEventKey: (event) => event.key === 'u',
      label: { id: 'components.Blocks.modifiers.underline', defaultMessage: 'Underline' },
      checkIsActive: () => baseCheckIsActive('underline'),
      handleToggle: () => baseHandleToggle('underline'),
      renderLeaf: (children) => <UnderlineText>{children}</UnderlineText>,
    },
    strikethrough: {
      icon: StrikeThrough,
      isValidEventKey: (event) => event.key === 'S' && event.shiftKey,
      label: { id: 'components.Blocks.modifiers.strikethrough', defaultMessage: 'Strikethrough' },
      checkIsActive: () => baseCheckIsActive('strikethrough'),
      handleToggle: () => baseHandleToggle('strikethrough'),
      renderLeaf: (children) => <StrikeThroughText>{children}</StrikeThroughText>,
    },
    code: {
      icon: Code,
      isValidEventKey: (event) => event.key === 'e',
      label: { id: 'components.Blocks.modifiers.code', defaultMessage: 'Code' },
      checkIsActive: () => baseCheckIsActive('code'),
      handleToggle: () => baseHandleToggle('code'),
      renderLeaf: (children) => <InlineCode>{children}</InlineCode>,
    },
  };
}

export { useModifiersStore };
export type { ModifiersStore };
