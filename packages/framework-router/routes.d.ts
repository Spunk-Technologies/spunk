declare namespace Routes {
  export type Path = (any extends UserDefinedPaths
    ? DefinedPaths
    : UserDefinedPaths | DefinedPaths) &
    string;
}
