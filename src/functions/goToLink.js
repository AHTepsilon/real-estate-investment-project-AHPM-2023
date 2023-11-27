import { useNavigate  } from 'react-router-dom';

export default function goToLink(url) {
    window.location.href = url;
}