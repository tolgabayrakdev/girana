import { useState } from "react";
import { Link } from "react-router";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call - 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Handle login logic here
        console.log("Login attempt:", { email, password });
        
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-semibold text-zinc-900 text-center mb-8">
                    Giriş Yap
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
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
                        <div className="mt-2 text-right">
                            <Link to="/forgot-password" className="text-sm text-zinc-600 hover:text-zinc-900">
                                Şifrenizi mi unuttunuz?
                            </Link>
                        </div>
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
                            "Giriş Yap"
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
                        Hesabınız yok mu?{" "}
                        <Link to="/sign-up" className="text-zinc-900 font-medium hover:underline">
                            Kayıt Ol
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}
