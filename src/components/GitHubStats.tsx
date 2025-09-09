import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Star, GitFork, Calendar, TrendingUp } from "lucide-react";

const GitHubStats = () => {
  // GitHub style stats - these would normally come from GitHub API
  const stats = {
    totalStars: 150,
    totalCommits: 1718,
    totalPRs: 85,
    totalIssues: 12,
    repositories: 42,
    followers: 130,
    contributions: 1718
  };

  const languages = [
    { name: "JavaScript", percentage: 45, color: "#f1e05a" },
    { name: "TypeScript", percentage: 30, color: "#2b7489" },
    { name: "Python", percentage: 15, color: "#3572A5" },
    { name: "Java", percentage: 8, color: "#b07219" },
    { name: "CSS", percentage: 2, color: "#563d7c" }
  ];

  const achievements = [
    { icon: "🏆", title: "Pull Shark", description: "Opened pull requests that have been merged" },
    { icon: "⚡", title: "Quickdraw", description: "Closed an issue or pull request within 5 min of opening" },
    { icon: "🌟", title: "Starstruck", description: "Created a repository that has 16 stars" },
    { icon: "🎯", title: "Public Sponsor", description: "Sponsored open source work via GitHub Sponsors" }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            GitHub <span className="bg-gradient-primary bg-clip-text text-transparent">Analytics</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            지속적인 개발 활동과 오픈소스 기여를 통한 성장 기록
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105 text-center">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1">{stats.contributions.toLocaleString()}</div>
            <div className="text-muted-foreground text-sm">총 기여도</div>
          </Card>
          
          <Card className="p-6 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105 text-center">
            <GitBranch className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1">{stats.repositories}</div>
            <div className="text-muted-foreground text-sm">저장소</div>
          </Card>
          
          <Card className="p-6 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105 text-center">
            <Star className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1">{stats.totalStars}</div>
            <div className="text-muted-foreground text-sm">받은 별</div>
          </Card>
          
          <Card className="p-6 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105 text-center">
            <GitFork className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-foreground mb-1">{stats.followers}</div>
            <div className="text-muted-foreground text-sm">팔로워</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Language Usage */}
          <Card className="p-8 bg-card border-border hover:shadow-glow-primary transition-all duration-300">
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Most Used Languages
            </h3>
            <div className="space-y-4">
              {languages.map((lang) => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">{lang.name}</span>
                    <span className="text-muted-foreground">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${lang.percentage}%`, 
                        backgroundColor: lang.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity Overview */}
          <Card className="p-8 bg-card border-border hover:shadow-glow-primary transition-all duration-300">
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              활동 개요
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                <div>
                  <div className="text-foreground font-medium">총 커밋</div>
                  <div className="text-muted-foreground text-sm">모든 저장소</div>
                </div>
                <div className="text-2xl font-bold text-primary">{stats.totalCommits.toLocaleString()}</div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                <div>
                  <div className="text-foreground font-medium">Pull Requests</div>
                  <div className="text-muted-foreground text-sm">승인된 PR</div>
                </div>
                <div className="text-2xl font-bold text-primary">{stats.totalPRs}</div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                <div>
                  <div className="text-foreground font-medium">이슈 해결</div>
                  <div className="text-muted-foreground text-sm">해결한 문제들</div>
                </div>
                <div className="text-2xl font-bold text-primary">{stats.totalIssues}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            GitHub <span className="bg-gradient-primary bg-clip-text text-transparent">Achievements</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card 
                key={achievement.title}
                className="p-6 bg-card border-border hover:shadow-glow-secondary transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{achievement.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;