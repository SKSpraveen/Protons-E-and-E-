import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch("http://localhost:8070/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL
        }),
        credentials: "include" 
      });

      if (!res.ok) throw new Error("Google auth failed");

      const data = await res.json();
      console.log("Google auth success:", data);

      dispatch(signInSuccess(data));
      navigate("/userhome");

    } catch (error) {
      console.error("OAuth error:", error);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '350px',
        padding: '12px 20px',
        margin: '20px auto',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: '#1D4ED8', // blue background
        color: 'white',
        fontWeight: '600',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2563EB'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1D4ED8'}
    >
      <AiFillGoogleCircle style={{ width: '24px', height: '24px', marginRight: '12px', color: 'white' }} />
      <span>Sign in with Google</span>
    </Button>
  );
};

export default OAuth;
