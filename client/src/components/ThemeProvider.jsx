import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className={`min-h-screen ${
          darkMode
            ? "bg-[rgb(16,23,42)] text-gray-200"
            : "bg-white text-gray-700"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
