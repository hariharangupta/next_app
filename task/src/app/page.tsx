"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import dashboard from "../../public/images/dashboard.jpg";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    const getData = storedData ? JSON.parse(storedData) : null;

    // Check if user data exists and if the token is valid
    if (!getData || !getData.token) {
      router.push("/"); // Redirect to home if not authenticated
    }
  }, [router]);

  return (
    <div className="main pt5 px-20 flex flex-col">
      <div className="flex justify-center items-center">
        <Image
          src={dashboard}
          width={1100}
          height={500}
          alt="Dashboard image"
        />
      </div>
    </div>
  );
}
