"use client";
import { chatSession } from "@/utils/AiModel";
import { Button } from "../ui/button";
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
import Markdown from "./parts/Markdown";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface Props {
  chartData: any;
  otherPrompt?: string;
}
type SUGGESTIONS = {
  suggestion: string;
  reason: string;
};
const AiExplain = ({ chartData, otherPrompt }: Props) => {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [suggestions, setSuggestions] = useState<SUGGESTIONS[]>([]);
  const GenerateExplanation = async (data: any) => {
    setLoading(true);
    const prompt =
      "Explain this data that was used to plot a graph and explain the trends as though you were explaining to a business professional.This is a Ghanaian educational data. Please be formal and concise but also straightforward and with flair. Mention figures wherever applicable . Please limit the words and use markdown where applicable to make it look elegant. The explanation should not exceed 120 words. Ensure that your values are right." +
      otherPrompt;
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
      <DialogContent className="text-sm w-full ">
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
          <ScrollArea className="h-72 w-full">
            <div className="" id="ai">
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

export default AiExplain;
