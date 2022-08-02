import { Link } from 'ice';

export interface Props {
  name: string;
}

const Greeting = ({ name }: Props) => {
  return (
    <div>
      <h2>404</h2>
      <div><Link to="/hp">Home</Link></div>
    </div>
  );
};

export default Greeting;
