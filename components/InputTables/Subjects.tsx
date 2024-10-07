"use client";

import { UpdateExamScore } from "@/app/_services/methods";
import { EXAMINATIONS, EXAMSCORES } from "@/app/_services/types";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/utils/db";
import { Examinations, ScoreTable } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, PlusCircleIcon } from "lucide-react";
import { ExamsScoreTable } from "@/app/dataTable/columData/ExamsColumns";

interface SchoolProps {
  school_id: string;
}
export const MathsTable = ({ school_id }: SchoolProps) => {
  const [math_A_input, set_math_A_input] = useState<any>(0);
  const [UpdatedStudents, setUpdatedStudents] = useState<boolean>(false);

  const [exam_id, setExamId] = useState<string>("");
  const [postedId, setPostedId] = useState<string>("");

  const [ExamsList, setExamsList] = useState<EXAMINATIONS[]>();

  const [StudentsList, setStudentsList] = useState<EXAMSCORES[]>();

  const GetScores = async (exams_id: string) => {
    try {
      // @ts-ignore
      const result: EXAMSCORES[] = await db
        .select()
        .from(ScoreTable)
        .where(
          and(
            eq(ScoreTable.exams_id, exams_id),
            eq(ScoreTable.school_id, school_id)
          )
        )
        .orderBy(ScoreTable.name);
      setStudentsList(result);
      // console.log(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const GetExaminations = async () => {
    try {
      const result = await db
        .select()
        .from(Examinations)
        .orderBy(Examinations.name);

      setExamsList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    exam_id !== "" && GetScores(exam_id);
  }, [exam_id]);

  useEffect(() => {
    StudentsList &&
      StudentsList.length > 0 &&
      set_math_A_input(StudentsList[0].math_A || 0);
  }, [StudentsList]);

  useEffect(() => {
    GetExaminations();
  }, [school_id]);
  useEffect(() => {
    exam_id !== "" && GetScores(exam_id);
  }, [UpdatedStudents]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { toast } = useToast();

  const onSubmit = (data: any) => {
    data = data.students[postedId];
    console.log(data);
    const student_id = data.id;
    const post = {
      math_A: data.math_A,
      math_B: data.math_B,
      math_tot: parseInt(data.math_A) + parseInt(data.math_B),
    };

    console.log(student_id, post);
    exam_id !== "" && UpdateExamScore(exam_id, student_id, post);
    toast({
      title: "Score Updated",
      description: "Student score has been updated successfully",
    });
    setUpdatedStudents(!UpdatedStudents);
  };
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <span>Exam:</span>
        <select
          onChange={(e) => {
            setExamId(e.target.value);
          }}
          className="w-48 my-8 text-sm p-2 bg-background border rounded-sm"
        >
          <option selected disabled>
            Select an exam
          </option>
          {ExamsList?.map((exam, index) => (
            <option key={index} value={exam.id}>
              {exam.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="grid grid-cols-5 gap-2 text-sm w-full border-b pb-2">
          <h1 className="font-medium text-muted-foreground/80 col-span-2">
            Student
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Section A
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Section B
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Actions
          </h1>
        </div>
        {StudentsList && StudentsList?.length > 0 ? (
          StudentsList?.map((student, index) => (
            <div>
              <form
                name={student.student_id}
                key={index}
                onSubmit={handleSubmit(onSubmit)}
                className="grid sm:grid-cols-5 gap-2 w-full"
              >
                <h1 className="col-span-2 font-medium text-sm">
                  {student.name}
                </h1>
                <input
                  {...register(`students.${student.student_id}.id`)}
                  value={math_A_input}
                  onChange={(e) => set_math_A_input(e.target.value)}
                  className="hidden"
                />

                <Input
                  id={`mathematics-a-${student.student_id}`}
                  max={40}
                  min={0}
                  type="number"
                  defaultValue={student.math_A}
                  {...register(`students.${student.student_id}.math_A`)}
                />
                <Input
                  id={`mathematics-b-${student.student_id}`}
                  type="number"
                  max={60}
                  min={0}
                  defaultValue={student.math_B}
                  {...register(`students.${student.student_id}.math_B`)}
                />
                <Button
                  className="text-sm w-fit flex gap-1 items-center justify-center"
                  type="submit"
                  onClick={() => {
                    setPostedId(student.student_id);
                  }}
                >
                  <PlusCircleIcon className="w-4 h-4" />
                  Add
                </Button>
              </form>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[20vh] col-span-full  py-52">
            You have not registered for this examination
          </div>
        )}
        {!StudentsList && (
          <div className="flex items-center justify-center  py-52">
            <Loader2 className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};

export const ScienceTable = ({ school_id }: SchoolProps) => {
  const [UpdatedStudents, setUpdatedStudents] = useState<boolean>(false);

  const [exam_id, setExamId] = useState<string>("");
  const [postedId, setPostedId] = useState<string>("");

  const [ExamsList, setExamsList] = useState<EXAMINATIONS[]>();

  const [StudentsList, setStudentsList] = useState<EXAMSCORES[]>();

  const GetScores = async (exams_id: string) => {
    try {
      // @ts-ignore
      const result: EXAMSCORES[] = await db
        .select()
        .from(ScoreTable)
        .where(
          and(
            eq(ScoreTable.exams_id, exams_id),
            eq(ScoreTable.school_id, school_id)
          )
        )
        .orderBy(ScoreTable.name);

      setStudentsList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const GetExaminations = async () => {
    try {
      const result = await db
        .select()
        .from(Examinations)
        .orderBy(Examinations.name);

      setExamsList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    exam_id !== "" && GetScores(exam_id);
  }, [exam_id]);

  useEffect(() => {
    GetExaminations();
  }, [school_id]);
  useEffect(() => {
    exam_id !== "" && GetScores(exam_id);
  }, [UpdatedStudents]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { toast } = useToast();

  const onSubmit = (data: any) => {
    data = data.students[postedId];

    const student_id = data.id;
    const post = {
      science_A: data.science_A,
      science_B: data.science_B,
      science_tot: Math.round(
        ((parseInt(data.science_A) + parseInt(data.science_B)) * 100) / 140
      ),
    };

    exam_id && exam_id !== "" && UpdateExamScore(exam_id, student_id, post);
    toast({
      title: "Score Updated",
      description: "Student score has been updated successfully",
    });
    setUpdatedStudents(!UpdatedStudents);
  };

  useEffect(() => {
    console.log("exam id:", exam_id);
  }, [exam_id]);
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <span>Exam:</span>
        <select
          onChange={(e) => {
            setExamId(e.target.value);
          }}
          className="w-48 my-8 text-sm p-2 bg-background border rounded-sm"
        >
          <option selected disabled>
            Select an exam
          </option>
          {ExamsList?.map((exam, index) => (
            <option key={index} value={exam.id}>
              {exam.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="grid grid-cols-5 gap-2 text-sm w-full border-b pb-2">
          <h1 className="font-medium text-muted-foreground/80 col-span-2">
            Student
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Section A
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Section B
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Actions
          </h1>
        </div>
        {StudentsList && StudentsList?.length > 0 ? (
          StudentsList?.map((student, index) => (
            <div>
              <form
                name={student.student_id}
                key={index}
                onSubmit={handleSubmit(onSubmit)}
                className="grid sm:grid-cols-5 gap-2 w-full"
              >
                <h1 className="col-span-2 font-medium text-sm">
                  {student.name}
                </h1>
                <input
                  {...register(`students.${student.student_id}.id`)}
                  defaultValue={student.student_id}
                  className="hidden"
                />

                <Input
                  max={40}
                  min={0}
                  type="number"
                  defaultValue={student.science_A}
                  {...register(`students.${student.student_id}.science_A`)}
                />
                <Input
                  type="number"
                  max={100}
                  min={0}
                  defaultValue={student.science_B}
                  {...register(`students.${student.student_id}.science_B`)}
                />
                <Button
                  className="text-sm w-fit flex gap-1 items-center justify-center"
                  type="submit"
                  onClick={() => {
                    setPostedId(student.student_id);
                  }}
                >
                  <PlusCircleIcon className="w-4 h-4" />
                  Add
                </Button>
              </form>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[20vh] col-span-full  py-52">
            You have not registered for this examination
          </div>
        )}
        {!StudentsList && (
          <div className="flex items-center justify-center  py-52">
            <Loader2 className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};

export const SocialTable = ({ school_id }: SchoolProps) => {
  const [UpdatedStudents, setUpdatedStudents] = useState<boolean>(false);

  const [exam_id, setExamId] = useState<string>("");
  const [postedId, setPostedId] = useState<string>("");

  const [ExamsList, setExamsList] = useState<EXAMINATIONS[]>();

  const [StudentsList, setStudentsList] = useState<EXAMSCORES[]>();

  const GetScores = async (exams_id: string) => {
    try {
      // @ts-ignore
      const result: EXAMSCORES[] = await db
        .select()
        .from(ScoreTable)
        .where(
          and(
            eq(ScoreTable.exams_id, exams_id),
            eq(ScoreTable.school_id, school_id)
          )
        )
        .orderBy(ScoreTable.name);
      console.log(result);
      setStudentsList(result);
      console.log(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const GetExaminations = async () => {
    try {
      const result = await db
        .select()
        .from(Examinations)
        .orderBy(Examinations.name);

      setExamsList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    exam_id !== "" && GetScores(exam_id);
  }, [exam_id]);

  useEffect(() => {
    GetExaminations();
  }, [school_id]);
  useEffect(() => {
    exam_id !== "" && GetScores(exam_id);
  }, [UpdatedStudents]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { toast } = useToast();

  const onSubmit = (data: any) => {
    data = data.students[postedId];
    console.log(data);
    const student_id = data.id;
    const post = {
      social_A: data.social_A,
      social_B: data.social_B,
      social_tot: parseInt(data.social_A) + parseInt(data.social_B),
    };

    console.log(student_id, post);
    exam_id !== "" && UpdateExamScore(exam_id, student_id, post);
    toast({
      title: "Score Updated",
      description: "Student score has been updated successfully",
    });
    setUpdatedStudents(!UpdatedStudents);
  };
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <span>Exam:</span>
        <select
          onChange={(e) => {
            setExamId(e.target.value);
          }}
          className="w-48 my-8 text-sm p-2 bg-background border rounded-sm"
        >
          <option selected disabled>
            Select an exam
          </option>
          {ExamsList?.map((exam, index) => (
            <option key={index} value={exam.id}>
              {exam.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="grid grid-cols-5 gap-2 text-sm w-full border-b pb-2">
          <h1 className="font-medium text-muted-foreground/80 col-span-2">
            Student
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Section A
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Section B
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Actions
          </h1>
        </div>
        {StudentsList && StudentsList?.length > 0 ? (
          StudentsList?.map((student, index) => (
            <div>
              <form
                name={student.student_id}
                key={index}
                onSubmit={handleSubmit(onSubmit)}
                className="grid sm:grid-cols-5 gap-2 w-full"
              >
                <h1 className="col-span-2 font-medium text-sm">
                  {student.name}
                </h1>
                <input
                  {...register(`students.${student.student_id}.id`)}
                  defaultValue={student.student_id}
                  className="hidden"
                />

                <Input
                  max={40}
                  min={0}
                  type="number"
                  defaultValue={student.social_A}
                  {...register(`students.${student.student_id}.social_A`)}
                />
                <Input
                  type="number"
                  max={60}
                  min={0}
                  defaultValue={student.social_B}
                  {...register(`students.${student.student_id}.social_B`)}
                />
                <Button
                  className="text-sm w-fit flex gap-1 items-center justify-center"
                  type="submit"
                  onClick={() => {
                    setPostedId(student.student_id);
                  }}
                >
                  <PlusCircleIcon className="w-4 h-4" />
                  Add
                </Button>
              </form>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[20vh] col-span-full  py-52">
            You have not registered for this examination
          </div>
        )}
        {!StudentsList && (
          <div className="flex items-center justify-center  py-52">
            <Loader2 className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};

export const EnglishTable = ({ school_id }: SchoolProps) => {
  const [UpdatedStudents, setUpdatedStudents] = useState<boolean>(false);

  const [exam_id, setExamId] = useState<string>("");
  const [postedId, setPostedId] = useState<string>("");

  const [ExamsList, setExamsList] = useState<EXAMINATIONS[]>();

  const [StudentsList, setStudentsList] = useState<EXAMSCORES[]>();

  const GetScores = async (exams_id: string) => {
    try {
      // @ts-ignore
      const result: EXAMSCORES[] = await db
        .select()
        .from(ScoreTable)
        .where(
          and(
            eq(ScoreTable.exams_id, exams_id),
            eq(ScoreTable.school_id, school_id)
          )
        )
        .orderBy(ScoreTable.name);
      console.log(result);
      setStudentsList(result);
      console.log(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const GetExaminations = async () => {
    try {
      const result = await db
        .select()
        .from(Examinations)
        .orderBy(Examinations.name);

      setExamsList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    exam_id !== "" && GetScores(exam_id);
  }, [exam_id]);

  useEffect(() => {
    GetExaminations();
  }, [school_id]);
  useEffect(() => {
    exam_id !== "" && GetScores(exam_id);
  }, [UpdatedStudents]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { toast } = useToast();

  const onSubmit = (data: any) => {
    data = data.students[postedId];
    console.log(data);
    const student_id = data.id;
    const post = {
      english_A: data.english_A,
      english_B: data.english_B,
      english_tot: parseInt(data.english_A) + parseInt(data.english_B),
    };

    console.log(student_id, post);
    exam_id !== "" && UpdateExamScore(exam_id, student_id, post);
    toast({
      title: "Score Updated",
      description: "Student score has been updated successfully",
    });
    setUpdatedStudents(!UpdatedStudents);
  };
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <span>Exam:</span>
        <select
          onChange={(e) => {
            setExamId(e.target.value);
          }}
          className="w-48 my-8 text-sm p-2 bg-background border rounded-sm"
        >
          <option selected disabled>
            Select an exam
          </option>
          {ExamsList?.map((exam, index) => (
            <option key={index} value={exam.id}>
              {exam.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="grid grid-cols-5 gap-2 text-sm w-full border-b pb-2">
          <h1 className="font-medium text-muted-foreground/80 col-span-2">
            Student
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Section A
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Section B
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Actions
          </h1>
        </div>
        {StudentsList && StudentsList?.length > 0 ? (
          StudentsList?.map((student, index) => (
            <div>
              <form
                name={student.student_id}
                key={index}
                onSubmit={handleSubmit(onSubmit)}
                className="grid sm:grid-cols-5 gap-2 w-full"
              >
                <h1 className="col-span-2 font-medium text-sm">
                  {student.name}
                </h1>
                <input
                  {...register(`students.${student.student_id}.id`)}
                  defaultValue={student.student_id}
                  className="hidden"
                />

                <Input
                  max={40}
                  min={0}
                  type="number"
                  defaultValue={student.english_A}
                  {...register(`students.${student.student_id}.english_A`)}
                />
                <Input
                  type="number"
                  max={60}
                  min={0}
                  defaultValue={student.english_B}
                  {...register(`students.${student.student_id}.english_B`)}
                />
                <Button
                  className="text-sm w-fit flex gap-1 items-center justify-center"
                  type="submit"
                  onClick={() => {
                    setPostedId(student.student_id);
                  }}
                >
                  <PlusCircleIcon className="w-4 h-4" />
                  Add
                </Button>
              </form>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[20vh] col-span-full  py-52">
            You have not registered for this examination
          </div>
        )}
        {!StudentsList && (
          <div className="flex items-center justify-center  py-52">
            <Loader2 className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};
export const CompTable = ({ school_id }: SchoolProps) => {
  const [UpdatedStudents, setUpdatedStudents] = useState<boolean>(false);

  const [exam_id, setExamId] = useState<string>("");
  const [postedId, setPostedId] = useState<string>("");

  const [ExamsList, setExamsList] = useState<EXAMINATIONS[]>();

  const [StudentsList, setStudentsList] = useState<EXAMSCORES[]>();

  const GetScores = async (exams_id: string) => {
    try {
      // @ts-ignore
      const result: EXAMSCORES[] = await db
        .select()
        .from(ScoreTable)
        .where(
          and(
            eq(ScoreTable.exams_id, exams_id),
            eq(ScoreTable.school_id, school_id)
          )
        )
        .orderBy(ScoreTable.name);
      console.log(result);
      setStudentsList(result);
      console.log(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const GetExaminations = async () => {
    try {
      const result = await db
        .select()
        .from(Examinations)
        .orderBy(Examinations.name);

      setExamsList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    exam_id !== "" && GetScores(exam_id);
  }, [exam_id]);

  useEffect(() => {
    GetExaminations();
  }, [school_id]);
  useEffect(() => {
    exam_id !== "" && GetScores(exam_id);
  }, [UpdatedStudents]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { toast } = useToast();

  const onSubmit = (data: any) => {
    data = data.students[postedId];
    console.log(data);
    const student_id = data.id;
    const post = {
      comp_A: data.comp_A,
      comp_B: data.comp_B,
      comp_tot: parseInt(data.comp_A) + parseInt(data.comp_B),
    };

    console.log(student_id, post);
    exam_id !== "" && UpdateExamScore(exam_id, student_id, post);
    toast({
      title: "Score Updated",
      description: "Student score has been updated successfully",
    });
    setUpdatedStudents(!UpdatedStudents);
  };
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <span>Exam:</span>
        <select
          onChange={(e) => {
            setExamId(e.target.value);
          }}
          className="w-48 my-8 text-sm p-2 bg-background border rounded-sm"
        >
          <option selected disabled>
            Select an exam
          </option>
          {ExamsList?.map((exam, index) => (
            <option key={index} value={exam.id}>
              {exam.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="grid grid-cols-5 gap-2 text-sm w-full border-b pb-2">
          <h1 className="font-medium text-muted-foreground/80 col-span-2">
            Student
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Section A
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Section B
          </h1>
          <h1 className="font-medium hidden sm:flex text-muted-foreground/80">
            Actions
          </h1>
        </div>
        {StudentsList && StudentsList?.length > 0 ? (
          StudentsList?.map((student, index) => (
            <div>
              <form
                name={student.student_id}
                key={index}
                onSubmit={handleSubmit(onSubmit)}
                className="grid sm:grid-cols-5 gap-2 w-full"
              >
                <h1 className="col-span-2 font-medium text-sm">
                  {student.name}
                </h1>
                <input
                  {...register(`students.${student.student_id}.id`)}
                  defaultValue={student.student_id}
                  className="hidden"
                />

                <Input
                  max={40}
                  min={0}
                  type="number"
                  defaultValue={student.comp_A}
                  {...register(`students.${student.student_id}.comp_A`)}
                />
                <Input
                  type="number"
                  max={60}
                  min={0}
                  defaultValue={student.comp_B}
                  {...register(`students.${student.student_id}.comp_B`)}
                />
                <Button
                  className="text-sm w-fit flex gap-1 items-center justify-center"
                  type="submit"
                  onClick={() => {
                    setPostedId(student.student_id);
                  }}
                >
                  <PlusCircleIcon className="w-4 h-4" />
                  Add
                </Button>
              </form>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[20vh] col-span-full  py-52">
            You have not registered for this examination
          </div>
        )}
        {!StudentsList && (
          <div className="flex items-center justify-center  py-52">
            <Loader2 className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};
