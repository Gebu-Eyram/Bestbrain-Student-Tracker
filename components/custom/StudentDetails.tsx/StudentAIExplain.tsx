"use client";
import { chatSession } from "@/utils/AiModel";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bot,
  BotIcon,
  BotMessageSquare,
  Lightbulb,
  Loader2,
} from "lucide-react";
import Markdown from "../parts/Markdown";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Props {
  chartData: any;
  otherPrompt?: string;
}
type SUGGESTIONS = {
  suggestion: string;
  reason: string;
};
const StudentAIExplain = ({ chartData, otherPrompt }: Props) => {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [suggestions, setSuggestions] = useState<SUGGESTIONS[]>([]);
  const GenerateExplanation = async (data: any) => {
    setLoading(true);
    const prompt =
      "Explain this data that was used to plot a graph of student performance and explain the trends as though you were explaining to a business professional.This is a Ghanaian educational data, do not metion this in the explanation. Please be formal and concise but also straightforward and with flair. Mention figures wherever applicable . Please limit the words and use markdown where applicable to make it look elegant. Please know that THIS DATA INDICATES SCORES FOR A SINGULAR STUDENT IN AN EXAMINATION, don't say this in the explanation.. The explanation should be in detail but should not exceed 200 words. Ensure that your values are right. Do not give any suggestions here. Just explain the data.Keep your English simple and clear for the average Ghanaian to understand you. Don't use any jargon. Also do'nt use any quotations to quote labels; do well to fit labels into a sentence without the use of a quotation. Every number and average is an average of scores scored by a student in an exam. The grade interpretation is 100-80=1/ 79-70=2/ 69-60=3/ 59-50=4/ 49-40=5/ 39-30=6/ 29-25=7/ 24-20=8/ 19-0=9 also 1 is Highest, 2 is Higher, 3 is High, 4 is High Average, 5 is Average, 6 is Low Average, 7 is Low, 8 is Lower, 9 is Lowest. Please try to find possible reasons for the trends. Analyse the data deeply too. " +
      otherPrompt;
    const suggestionprompt =
      'Make very informed suggestions to the school owner based on the data, adressing key deficiencies. Please be formal and concise but also straightforward and with flair. Mention figures wherever applicable . Please limit the words and use JSON parsable format only. Make at most three suggestions and at least one suggestion but make sure each suggestion does not exceed 20 words. Ensure that your values are right. Just return the array without any external text such as ```json ["suggestion1", "suggestion2"] ``` In each object, please add a reason for the suggestion. Never under any circumstance should you add  ```json``` to the response. ';
    const FinalPrompt = JSON.stringify(data) + ", " + prompt;
    const FinalSuggestionPrompt =
      JSON.stringify(data) + ", " + suggestionprompt;

    try {
      const result = await chatSession.sendMessage(FinalPrompt);
      const suggestionresult = await chatSession.sendMessage(
        FinalSuggestionPrompt
      );
      const JsonSuggestions = suggestionresult.response.text();

      setSuggestions(JSON.parse(JsonSuggestions));
      setLoading(false);
      setExplanation(result.response.text());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            GenerateExplanation(chartData);
          }}
          variant="outline"
          className="absolute top-4 right-4"
          size={"icon"}
        >
          <BotMessageSquare size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-100px  text-sm sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Button size={"icon"} variant={"outline"}>
              <BotIcon size={24} className="" />
            </Button>
            AI Explanation
          </DialogTitle>
          <DialogDescription>
            An AI model generated analysis for the data.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
          </div>
        ) : (
          <ScrollArea className="h-72 ">
            <div className="">
              <div className="my-3 mt-6 font-semibold">Explanation:</div>
              <Markdown text={explanation} />
              <div className="flex-flex-col gap-2">
                <div className="my-3 mt-6 font-semibold flex items-center">
                  <Lightbulb className="mr-2" size={20} />
                  <span className="text-lg">Suggestions</span>
                </div>
                <div className="grid ">
                  {suggestions.map((suggestion, index: number) => (
                    <div
                      key={index}
                      className="mb-4 grid grid-cols-[25px_1fr]  items-start pb-4 last:mb-0 last:pb-0"
                    >
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-1">
                        <h1 className="text-sm font-medium leading-normal">
                          {suggestion.suggestion}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                          {suggestion.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StudentAIExplain;
