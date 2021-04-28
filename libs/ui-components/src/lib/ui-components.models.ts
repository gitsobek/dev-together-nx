import { ListType } from '@dev-together/blog';

export interface TabSwitchConfig {
  name: string;
  type: ListType;
}

export interface ModalConfig {
  headerText?: string;
  content: string;
  showButtons?: boolean;
}