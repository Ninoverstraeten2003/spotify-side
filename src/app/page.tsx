import { Icons } from "@/components/icons";
import { UserAuthForm } from "@/components/user-auth-form";

export default async function AuthenticationPage() {
  return (
    <>
      <div className="container relative grid h-full flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Icons.spotify className="mr-2 h-8 w-8 rounded-md bg-secondary" />
            Voting Playlist
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;I hope you enjoy this side project&rdquo;
              </p>
              <footer className="text-sm">Nino Verstraeten</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in with Spotify
              </h1>
              <p className="text-sm text-muted-foreground">
                Click the icon below to sign in with Spotify
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
