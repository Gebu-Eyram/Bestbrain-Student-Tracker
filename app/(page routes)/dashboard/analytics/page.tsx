"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useMemo, useState } from "react";
import { STUDENTS } from "@/components/custom/sections/admin/pageComp/StudentComponents";
import { EXAMINATIONS } from "@/app/_services/types";
import { db } from "@/utils/db";
import { Examinations, ScoreTable } from "@/utils/schema";

const Analytics = () => {
  const { user } = useKindeBrowserClient();

  // Details

  const [ExamsList, setExamsList] = useState<EXAMINATIONS[]>([]);
  const [recentExam, setRecentExam] = useState<EXAMINATIONS>();
  const [coreAvg, setCoreAvg] = useState<number>(0);
  const [electiveAvg, setElectiveAvg] = useState<number>(0);
  const [school_id, setSchool_id] = useState<string>();
  const [examScores, setExamScores] = useState<any[]>([]);
  const [examAverage, setExamAverage] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);

  const [open, setOpen] = useState(true);
  const [selectedExamId, setSelectedExamId] = useState("");

  useEffect(() => {
    user && setSchool_id(user.id);
  }, [user]);

  useEffect(() => {
    if (selectedExamId) {
      GetScores(school_id, selectedExamId);
    }
  }, [selectedExamId]);

  useEffect(() => {
    GenerateExplanation(examScores);
  }, [examScores]);

  useEffect(() => {
    if (user) {
      const school_id = user.id;
      GetExaminations(school_id);
    }
  }, [user]);

  const GetExaminations = async (school_id: any) => {
    try {
      const result = await db
        .select()
        .from(Examinations)
        .orderBy(Examinations.createdAt);
      setExamsList(result);
    } catch (error) {
      console.error(error);
    }
  };

  const GetScores = async (school_id: any, exam_id: any) => {
    try {
      const result = await db
        .select()
        .from(ScoreTable)
        .where(
          and(
            eq(ScoreTable.school_id, school_id),
            eq(ScoreTable.exams_id, exam_id)
          )
        );
      setChartData(result);

      const length = result.length;
      const totalScores = sumScores(result);

      // Prepare the average scores for each subject
      const averageScores = [
        { subject: "Maths", total: totalScores.math_tot / length },
        { subject: "English", total: totalScores.english_tot / length },
        { subject: "Science", total: totalScores.science_tot / length },
        { subject: "Social Studies", total: totalScores.social_tot / length },
        { subject: "RME", total: totalScores.rme_tot / length },
        { subject: "French", total: totalScores.french_tot / length },
        { subject: "ICT", total: totalScores.comp_tot / length },
        { subject: "Career", total: totalScores.career_tot / length },
        { subject: "Creative Arts", total: totalScores.c_arts_tot / length },
        {
          subject: "Ghanaian Language",
          total: totalScores.gh_lang_tot / length,
        },
      ];
      setCoreAvg(
        (totalScores.math_tot / length +
          totalScores.english_tot / length +
          totalScores.science_tot / length +
          totalScores.social_tot / length) /
          4
      );
      setElectiveAvg(
        (totalScores.rme_tot / length +
          totalScores.french_tot / length +
          totalScores.comp_tot / length +
          totalScores.career_tot / length +
          totalScores.c_arts_tot / length +
          totalScores.gh_lang_tot / length) /
          6
      );

      setExamScores(averageScores);

      // Calculate overall average
      const overallAverage =
        (totalScores.math_tot / length +
          totalScores.english_tot / length +
          totalScores.career_tot / length +
          totalScores.c_arts_tot / length +
          totalScores.comp_tot / length +
          totalScores.french_tot / length +
          totalScores.gh_lang_tot / length +
          totalScores.rme_tot / length +
          totalScores.science_tot / length +
          totalScores.social_tot / length) /
        10;
      setExamAverage(overallAverage);
    } catch (error) {
      console.error(error);
    }
  };

  const sumScores = (scores: any) => {
    const totals = {
      c_arts_tot: 0,
      career_tot: 0,
      comp_tot: 0,
      english_tot: 0,
      french_tot: 0,
      gh_lang_tot: 0,
      math_tot: 0,
      rme_tot: 0,
      science_tot: 0,
      social_tot: 0,
    };

    scores.forEach((score: any) => {
      totals.c_arts_tot += score.c_arts_tot || 0;
      totals.career_tot += score.career_tot || 0;
      totals.comp_tot += score.comp_tot || 0;
      totals.english_tot += score.english_tot || 0;
      totals.french_tot += score.french_tot || 0;
      totals.gh_lang_tot += score.gh_lang_tot || 0;
      totals.math_tot += score.math_tot || 0;
      totals.rme_tot += score.rme_tot || 0;
      totals.science_tot += score.science_tot || 0;
      totals.social_tot += score.social_tot || 0;
    });

    return totals;
  };

  ///AI
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [studentExplanation, setStudentExplanation] = useState("");

  const GenerateExplanation = async (data: any) => {
    setLoading(true);
    const prompt = `Avoid plane text. Add headers, numbered lists, bullet points, tables and other stuff to make your work cleaner and nicer.You are an examiner providing explicit exam  essays for schools. Explain this data that was used to plot a graph and explain the trends as though you were explaining to a business professional.This is a Ghanaian educational data. Please be formal and concise but also straightforward and with flair. Mention figures wherever applicable . Please limit the words and use markdown where applicable to make it look elegant. The explanation should not be less than 500 words and not exceed 600 words. Ensure that your values are right.   Give headings, sections or whatever you deem applicable. You are a school grading expert in Ghana. You follow rules. This data presents the average scores of students in recent examinations across various subjects. Please analyze the trends in student performance and explain these to the school owner. You are to perform a top-notch data analysis of the data you are given. The grading scale is as follows. Do not infer grades from average scores. PLEASE STICK TO THIS SCALE AND ONLY THIS SCALE. Please do not categorize grades relative to one anothr or use any scale apart from this: any deviations will render the information irrelevant.If you are unsure, please consult the school owner or the school's grading policy.:
    80 to 100 only: HIGHEST 
    70 to 79 only: HIGHER
    60 to 69 only: HIGH
    50 to 59 only: HIGH AVERAGE
    40 to 49 only: AVERAGE
    30 to 39 only: LOW AVERAGE
    25 to 29 only: LOW  
    20 to 24 only: LOWER
    0 to 19 only: LOWEST
    Important: Always correlate average scores with the corresponding grades DO NOT infer.
    Note:  Any average score below 50 is considered below average and should not be considered as "HIGH".
    Please identify possible reasons for the observed trends and correlate average scores with the corresponding grades. Conduct a thorough analysis of the data. Make sure to use tables to support your analysis. Be mindful of decimals as well. 
    Eg 1:42.125 is in the range 40 to 49 and should be considered AVERAGE according to the grading scale.
    Eg2: 54.23 is in the range 50 to 59 and should be considered HIGH AVERAGE according to the grading scale.
    Eg3: 19.99 is in the range 0 to 19 and should be considered LOWEST according to the grading scale.
    Eg4: 79.99 is in the range 70 to 79 and should be considered HIGHER according to the grading scale.
    Eg5: 93 is in the range 80 to 100 and should be considered HIGHEST according to the grading scale.
    Eg6: 29.99 is in the range 25 to 29 and should be considered LOW according to the grading scale.`;
    const suggestionprompt =
      'Make informed suggestions to a business professional based on the data. Please be formal and concise but also straightforward and with flair. Mention figures wherever applicable. This is a Ghanaian educational data . Please limit the words and use JSON parsable format only. Make at most three suggestions and at least one suggestion but make sure each suggestion does not exceed 20 words. Ensure that your values are right. Just return the array without any external text such as ```json ["suggestion1", "suggestion2"] ``` In each object, please add a reason for the suggestion. Never under any circumstance should you add  ```json``` to the response. ';
    const FinalPrompt = JSON.stringify(data) + ", " + prompt;
    const FinalSuggestionPrompt =
      JSON.stringify(data) + ", " + suggestionprompt;

    try {
      const result = await chatSession.sendMessage(FinalPrompt);
      const suggestionresult = await chatSession.sendMessage(
        FinalSuggestionPrompt
      );
      const JsonSuggestions = suggestionresult.response.text();

      setLoading(false);
      setExplanation(result.response.text());
    } catch (error) {
      console.error(error);
    }
  };

  const GenerateStudentExplanation = async (data: any) => {
    const prompt = `Avoid plane text. Add headers, numbered lists, bullet points, tables and other stuff to make your work cleaner and nicer.Ensure that your bullet points contain more than 20 words per point. BE ELABORATE BUT ALSO VERY CORRECT. You are an examiner providing explicit exam  essays for schools. Try to analyse CORE and ELECTIVE subjects differently. Explain this data that was used to plot a graph and explain the trends as though you were explaining to a business professional.This is a Ghanaian educational data. Please be formal and concise but also straightforward and with flair. Mention figures wherever applicable . Please limit the words and use markdown where applicable to make it look elegant. The explanation should not be less than 700 words and not exceed 5600 words. For this analysis, it is better to group students performancde in a certain field in one table. Eg. All mathematics scores in 1 table ans so on.Then you can describe the trends we see. Ensure that your values are right. In the given data, I have provided student names. Refrain from using names such as Student A or Student 1. Use the names provided. For every point you make on student performance, pease state some reasons or just explain why you made such asssumptions.   Give headings, sections or whatever you deem applicable. You are a school grading expert in Ghana. Your task is to analyse the performance of each student in this report showing their strengths and weaknesses You follow rules. This data presents the individual performances of students in an examination across various subjects. Please idntify and analyze the trends in students' performance and explain these to the school owner. You are to perform a top-notch data analysis of the data you are given. The grading scale is as follows. PLEASE STICK TO THIS SCALE AND ONLY THIS SCALE. Please do not categorize grades relative to one anothr or use any scale apart from this: any deviations will render the information irrelevant.If you are unsure, please consult the school owner or the school's grading policy. pLEASE DO NOT repeat this grading scale in your response.:
    80 to 100 only: HIGHEST 
    70 to 79 only: HIGHER
    60 to 69 only: HIGH
    50 to 59 only: HIGH AVERAGE
    40 to 49 only: AVERAGE
    30 to 39 only: LOW AVERAGE
    25 to 29 only: LOW  
    20 to 24 only: LOWER
    0 to 19 only: LOWEST
    Important: Always correlate  scores with the corresponding grades DO NOT infer.
    Important: Do not repeat the grading scale in your response .
    Note:  Any average score below 50 is considered below average and should not be considered as "HIGH".
    Please identify possible reasons for the observed trends and correlate average scores with the corresponding grades. Conduct a thorough analysis of the data. Make sure to use tables to support your analysis. Be mindful of decimals as well. 
    Eg 1:42.125 is in the range 40 to 49 and should be considered AVERAGE according to the grading scale.
    Eg2: 54.23 is in the range 50 to 59 and should be considered HIGH AVERAGE according to the grading scale.
    Eg3: 19.99 is in the range 0 to 19 and should be considered LOWEST according to the grading scale.
    Eg4: 79.99 is in the range 70 to 79 and should be considered HIGHER according to the grading scale.
    Eg5: 93 is in the range 80 to 100 and should be considered HIGHEST according to the grading scale.
    Eg6: 29.99 is in the range 25 to 29 and should be considered LOW according to the grading scale.`;

    const FinalPrompt = JSON.stringify(data) + ", " + prompt;

    try {
      const result = await chatSession.sendMessage(FinalPrompt);

      setStudentExplanation(result.response.text());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GenerateStudentExplanation(chartData);
  }, [chartData]);

  return (
    <Card id="ai" className="w-full min-h-screen !text-foreground/80">
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <Button
              variant={"outline"}
              onClick={() => setOpen(false)}
              className="w-fit !bg-transparent border absolute right-3 top-3 p-2 px-3"
            >
              <X className="w-4 h-4" />
            </Button>
            <AlertDialogTitle>Choose your examination</AlertDialogTitle>
            <AlertDialogDescription>
              Our analytics tool will give you an in-depth analysis of your
              school's performance.
            </AlertDialogDescription>
            <Select onValueChange={setSelectedExamId}>
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Choose an exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Exams</SelectLabel>
                  {ExamsList.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id.toString()}>
                      {exam.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-t py-4">
            <AlertDialogAction
              onClick={() => setOpen(false)}
              className="ml-auto"
            >
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CardHeader className="p-4 text-center">
        <Button
          variant={"outline"}
          className="w-fit p-2"
          onClick={() => setOpen(true)}
        >
          <Settings className="w-4 h-4" />
        </Button>

        <CardTitle>Average School Performance</CardTitle>
        <CardDescription>
          A canvas of your school's performance in recent examinations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Markdown text={studentExplanation} />
        <Separator className="my-8" />
        <Markdown text={explanation} />
      </CardContent>
    </Card>
  );
};

import { and, eq } from "drizzle-orm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Settings, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chatSession } from "@/utils/AiModel";
import Markdown from "@/components/custom/parts/Markdown";
import { set } from "react-hook-form";

export default Analytics;
