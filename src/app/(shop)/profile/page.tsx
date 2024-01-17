import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    //redirect("/auth/login?returnTo=/profile");
    redirect("/auth/login");
  }

  return (
    <div>
      <Title title="Perfil de Usuario" />
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
    </div>
  );
}
