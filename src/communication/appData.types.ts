export interface ProjectFlags {
  isTestProject: boolean;
  isDesignTokensProject: boolean;
  isDesignSystemProject: boolean;
}

export type AppData =
  & ProjectFlags;