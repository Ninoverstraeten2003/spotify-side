import { Icons } from "@/components/icons";
import { UserAuthForm } from "@/components/user-auth-form";

export default async function AuthenticationPage() {
  return (
    <>
      <div className="container absolute grid h-full flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 lg:flex">
          <div className="absolute inset-0 border-r-2 bg-primary drop-shadow-md dark:bg-background" />
          <div className="relative z-20 mt-14 flex items-center text-lg font-medium">
            <Icons.spotify className="mr-2 h-8 w-8 rounded-md bg-background fill-foreground" />
            <p className="text-primary-foreground dark:text-foreground">Voting Playlist</p>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-primary-foreground dark:text-foreground">&ldquo;I hope you enjoy this side project&rdquo;</p>
              <footer className="text-sm text-primary-foreground dark:text-foreground">Nino Verstraeten</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">Sign in with Spotify</h1>
              <p className="text-sm text-foreground">Click the icon below to sign in with Spotify</p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
