
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, TrendingUp, User, Briefcase, GraduationCap, MessageSquare } from 'lucide-react';

interface AnalysisData {
  analysis_id: number;
  candidate_name: string;
  summary: string;
  score: number;
  details: {
    candidate_name: string;
    job_title_from_jd: string;
    overall_suitability_score: number;
    summary_assessment: string;
    strengths_aligned_with_jd: string[];
    areas_for_further_exploration_or_concern: string[];
    detailed_skill_match_analysis: Array<{
      skill_name: string;
      jd_requirement_description: string;
      candidate_evidence_and_assessment: string;
      match_level: string;
      commentary: string;
    }>;
    relevant_experience_summary: Array<{
      job_title_in_resume: string;
      company_and_duration: string;
      relevance_to_jd: string;
      key_achievements_or_responsibilities_matched: string[];
      experience_notes: string;
    }>;
    education_and_certification_match: {
      education_match_summary: string;
      certification_match_summary: string;
    };
    suggested_interview_questions: string[];
    potential_red_flags: string[];
  };
  created_at: string;
}

interface CandidateAnalysisProps {
  analysis: AnalysisData;
}

const CandidateAnalysis: React.FC<CandidateAnalysisProps> = ({ analysis }) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelevanceColor = (relevance: string) => {
    switch (relevance.toLowerCase()) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{analysis.details.job_title_from_jd}</h3>
                <p className="text-gray-600">Candidate: {analysis.candidate_name}</p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>
                  {Math.round(analysis.score * 100)}%
                </div>
                <p className="text-sm text-gray-500">Match Score</p>
              </div>
            </div>
            <Progress value={analysis.score * 100} className="w-full" />
            <p className="text-gray-700">{analysis.summary}</p>
          </div>
        </CardContent>
      </Card>

      {/* Strengths and Concerns */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.details.strengths_aligned_with_jd.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertCircle className="h-5 w-5" />
              Areas for Exploration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.details.areas_for_further_exploration_or_concern.map((concern, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{concern}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Skill Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Detailed Skill Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.details.detailed_skill_match_analysis.map((skill, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{skill.skill_name}</h4>
                  <Badge className={getMatchLevelColor(skill.match_level)}>
                    {skill.match_level} Match
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{skill.jd_requirement_description}</p>
                <p className="text-sm mb-2">{skill.candidate_evidence_and_assessment}</p>
                <p className="text-sm font-medium text-gray-700">{skill.commentary}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Relevant Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.details.relevant_experience_summary.map((exp, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{exp.job_title_in_resume}</h4>
                    <p className="text-sm text-gray-600">{exp.company_and_duration}</p>
                  </div>
                  <Badge className={getRelevanceColor(exp.relevance_to_jd)}>
                    {exp.relevance_to_jd} Relevance
                  </Badge>
                </div>
                <ul className="text-sm space-y-1 mb-2">
                  {exp.key_achievements_or_responsibilities_matched.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                      {achievement}
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-medium text-gray-700">{exp.experience_notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Suggested Interview Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {analysis.details.suggested_interview_questions.map((question, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-skillsync-purple text-white rounded-full text-xs flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm">{question}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Red Flags */}
      {analysis.details.potential_red_flags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              Potential Red Flags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.details.potential_red_flags.map((flag, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{flag}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CandidateAnalysis;
