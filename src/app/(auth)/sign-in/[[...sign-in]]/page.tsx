import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="mx-auto size-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-sm">
                        DF
                    </div>
                    <h1 className="mt-6 text-3xl font-bold tracking-tight">Welcome back</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to continue to DevFlow
                    </p>
                </div>
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: "mx-auto w-full",
                            card: "shadow-none border border-border bg-card rounded-2xl p-6",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            socialButtonsBlockButton: "rounded-xl border-border bg-background hover:bg-accent text-foreground font-medium",
                            formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 transition-all",
                            formFieldInput: "rounded-xl border-border bg-background h-11 focus:ring-primary focus:border-primary",
                            dividerLine: "bg-border",
                            dividerText: "text-muted-foreground text-xs uppercase font-medium",
                            footerActionLink: "text-primary hover:text-primary/80 font-semibold",
                            identityPreviewText: "text-foreground font-medium",
                            formResendCodeLink: "text-primary hover:text-primary/80 transition-all",
                            formFieldLabel: "text-foreground font-medium mb-1.5",
                        },
                    }}
                />
            </div>
        </div>
    );
}
