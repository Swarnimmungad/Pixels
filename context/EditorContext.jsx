import React, { createContext, useContext } from "react";
export const EditorContext = createContext();

export const useCanvas = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("The Context is not available ");
  }
  return context;
};
