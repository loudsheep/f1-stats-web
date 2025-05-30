import GithubButton from "@/components/GithubButton";

export default function About() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">About This Project</h1>
            <p className="text-lg mb-4">
                Formula 1 has always been a passion of mine. As a fullstack developer, I started this website as a side project to combine my love for racing with my interest in building things for the web.
            </p>
            <p className="text-lg mb-4">
                What began as a solo project during my free time has now grown into a small collaboration with a couple of friends who share both the passion for F1 and for coding.
            </p>
            <p className="text-lg mb-6">
                We're excited to keep evolving this project together. Thanks for checking it out!
            </p>
            <GithubButton username="loudsheep" repoName="f1-stats-web" />
        </div>
    );
}
