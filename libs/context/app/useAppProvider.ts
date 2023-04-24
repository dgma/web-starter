import { useContext } from "react";

import { AppContext } from "./AppProvider";

const useApp = () => useContext(AppContext);

export default useApp;
