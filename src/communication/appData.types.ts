export interface ProjectFlags {
  isTestProject: boolean;
  isDesignTokensProject: boolean;
  isDesignSystemProject: boolean;
}

export interface DocumentInfo extends ProjectFlags {
  id: string;
  name: string;
}

export interface AppData {
  user: User;
  document: DocumentInfo;
};