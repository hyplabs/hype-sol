import Payment from './components/Payment';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function App() {
  return (
    <div className="App">
        <Card style={{ width: '25rem' }}>
          <Card.Body>
            <Card.Title>Stripe Form</Card.Title>
            <Card.Text>
              This is an example payment form. The payment amount is coded into Payment.js, and the Stripe Server has the stripe private key encoded.
              Other than that you can configure this form via the .env.local!
              The default info is:
              <ul>
                <li>Card: 4242 4242 4242 4242</li>
                <li>Any Future: ##/##</li>
                <li>Any CVC: ###</li>
                <li>Any Country: ???</li>
                <li>Any Postal Code: ?#? #?#</li>
              </ul>
            </Card.Text>
            <Payment />
          </Card.Body>
        </Card>        
    </div>
  );
}

export default App;
