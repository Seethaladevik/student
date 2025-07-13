import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Browse from './browse'
import { KnockProvider } from '@knocklabs/react'

const root = ReactDOM.createRoot(document.getElementById('root'))

// Fetch the user token from FastAPI backend
fetch("http://localhost:8000/knock-token")
  .then((res) => res.json())
  .then((data) => {
    const token = data.user_token;

    root.render(
      <React.StrictMode>
        <KnockProvider
          apiKey="pk_cBlwgRRBkMc-3KKgA0J7W-q7LbxjyDuL1u3XXU164p4"
          userId="Jannu"
          userToken={token}
        >
          <Browse />
        </KnockProvider>
      </React.StrictMode>
    );
  })
  .catch((err) => {
    console.error("❌ Failed to fetch Knock token:", err);
    root.render(<div>Failed to initialize Knock</div>);
  });
