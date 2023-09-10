// pages/app.jsx
import React from 'react';

const App = ({ initialState }) => {
  const [state, setState] = React.useState(initialState);

  return (
    <div>
      <h1>Welcome to My App</h1>
    </div>
  );
};

App.getInitialProps = () => {
  const initialState = 'initialStateFromServer';

  return { initialState };
};

export default App;