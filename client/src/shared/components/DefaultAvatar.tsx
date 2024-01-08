import useAuth from "../../store/useAuth";

export default function DefaultAvatar() {
  const { auth } = useAuth();
  const usernameChars = auth!.username.split("");
  const initial = usernameChars[0] + usernameChars[1];

  return (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-cs-dark pr-[1px] text-xs uppercase leading-none text-white">
      {initial}
    </div>
  );
}
