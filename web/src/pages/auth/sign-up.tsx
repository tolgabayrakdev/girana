import { useState } from "react";
import { Link } from "react-router";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call - 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Handle sign up logic here
        console.log("Sign up attempt:", { name, email, password, confirmPassword });
        
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-semibold text-zinc-900 text-center mb-8">
                    Kayıt Ol
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Ad Soyad
                        </label>
                        <input
                            type="text"
                            placeholder="Adınız ve soyadınız"
                            className="input input-bordered w-full bg-white border-zinc-300 text-zinc-900 focus:border-zinc-500 focus:outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            E-posta
                        </label>
                        <input
                            type="email"
                            placeholder="ornek@email.com"
                            className="input input-bordered w-full bg-white border-zinc-300 text-zinc-900 focus:border-zinc-500 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Şifre
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="input input-bordered w-full bg-white border-zinc-300 text-zinc-900 focus:border-zinc-500 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Şifre Tekrar
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="input input-bordered w-full bg-white border-zinc-300 text-zinc-900 focus:border-zinc-500 focus:outline-none"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn w-full bg-zinc-900 text-white hover:bg-zinc-800 border-none"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Yükleniyor...
                            </>
                        ) : (
                            "Kayıt Ol"
                        )}
                    </button>
                </form>

                <div className="mt-6 flex items-center gap-4">
                    <div className="flex-1 h-px bg-zinc-300"></div>
                    <span className="text-sm text-zinc-500">veya</span>
                    <div className="flex-1 h-px bg-zinc-300"></div>
                </div>

                <div className="mt-6 text-center">
                    <span className="text-sm text-zinc-600">
                        Zaten hesabınız var mı?{" "}
                        <Link to="/sign-in" className="text-zinc-900 font-medium hover:underline">
                            Giriş Yap
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

