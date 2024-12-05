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
import { BotIcon, BotMessageSquare, Lightbulb } from "lucide-react";
import Markdown from "./parts/Markdown";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Loader from "./parts/Loader";

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
      "Make very informed suggestions to the school owner based on the data, adressing key deficiencies. Please be formal and concise but also straightforward and with flair. Mention figures wherever applicable . Please limit the words and use JSON parsable format only. Make at most three suggestions and at least one suggestion but make sure each suggestion does not exceed 20 words. Just return [ { suggestion: 'Your suggestion', reason: 'Reason for your suggestion' } ]";
    const FinalPrompt = JSON.stringify(data) + ", " + prompt;
    const FinalSuggestionPrompt =
      JSON.stringify(data) + ", " + suggestionprompt;

    try {
      const result = await chatSession.sendMessage(FinalPrompt);

      setExplanation(result.response.text());
      const suggestionresult = await chatSession.sendMessage(
        FinalSuggestionPrompt
      );
      const JsonSuggestions = suggestionresult.response
        .text()
        .replace("json", "")
        .replace("```", "")
        .replace("```", "");
      console.log(JsonSuggestions);

      setSuggestions(JSON.parse(JsonSuggestions));
      setLoading(false);
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
            <Button
              size={"icon"}
              variant={"outline"}
              className="p-1 flex items-center justify-center"
            >
              <BotIcon size={24} className="h-4 w-4" />
            </Button>
            AI Explanation
          </DialogTitle>
          <DialogDescription>
            An AI model generated analysis for the data.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader />
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
                        <p className="text-sm font-bold  tracking-wide leading-normal">
                          {suggestion.suggestion}
                        </p>
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
