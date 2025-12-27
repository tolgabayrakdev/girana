import { useState } from "react";
import { Link } from "react-router";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call - 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Handle forgot password logic here
        console.log("Forgot password attempt:", { email });
        
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-semibold text-zinc-900 text-center mb-8">
                    Şifremi Unuttum
                </h2>
                
                <p className="text-sm text-zinc-600 text-center mb-6">
                    E-posta adresinize şifre sıfırlama bağlantısı göndereceğiz.
                </p>
                
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
                            "Gönder"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/sign-in" className="text-sm text-zinc-900 font-medium hover:underline">
                        ← Giriş sayfasına dön
                    </Link>
                </div>
            </div>
        </div>
    );
}

