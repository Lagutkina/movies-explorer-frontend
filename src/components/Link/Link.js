import './Link.css';
import { Link as DomLink } from 'react-router-dom';
function Link({ className, children, to }) {
  return (
    <DomLink to={to} className={`link ${className}`}>
      {children}
    </DomLink>
  );
}
export default Link;
