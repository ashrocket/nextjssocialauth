import { signIn, useSession } from 'next-auth/react';
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/Home.module.css'

export default function SignInComponent() {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);

    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/');
        }
    })

    async function signInWithEmail() {
        return signIn('email', { email })
    }

    async function handleSignIn() {
        await signInWithEmail();
    }

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            return handleSignIn();
        }
    }

    function updateEmail(e: ChangeEvent<HTMLInputElement>) {
        setIsValid(e.target.validity.valid)
        setEmail(e.target.value);
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <form onSubmit={e => e.preventDefault()}>
                    <input
                        name="email"
                        type="email"
                        id="email"
                        autoComplete="home email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={updateEmail}
                        onKeyDown={handleKeyDown}
                    />
                    <button type="button" onClick={handleSignIn} disabled={!isValid}>
                        Sign in
                    </button>
                </form>
            </main>
        </div>
    )
}