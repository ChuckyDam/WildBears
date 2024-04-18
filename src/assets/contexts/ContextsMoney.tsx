import React from "react";

const StyleContext = React.createContext<any>(null);

export const MoneyProvider = StyleContext.Provider;

export default StyleContext;