import { Navbar } from "@/components/home/navbar"

export default function LoginPage() {
    return (
        <div>
            <Navbar />
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontWeight: 600,
                }}
            >
                Auth Page
            </div>
        </div>
    );
}
