'use client';

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Palette,
  Calendar,
  Tag,
  Paperclip,
  Users,
  MoreHorizontal,
  ArrowRight,
  Share2
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Assignee = {
  name: string;
  avatarUrl: string;
};

type ProjectTag = {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
};

type Attachment = {
  name: string;
  url: string;
  size: string;
  type: "pdf" | "figma";
};

type SubTask = {
  id: number;
  task: string;
  category: string;
  status: "Completed" | "In Progress" | "Pending";
  dueDate: string;
};

export type ProjectDetailViewProps = {
  breadcrumbs: { label: string; href: string }[];
  title: string;
  status: string;
  assignees: Assignee[];
  dateRange: {
    start: string;
    end: string;
  };
  tags: ProjectTag[];
  description: string;
  attachments?: Attachment[];
  subTasks?: SubTask[];
};

const StatusBadge = ({ status }: { status: SubTask["status"] }) => {
  const statusStyles = {
    Completed: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 border-green-200 dark:border-green-700/60",
    "In Progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700/60",
    Pending: "bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-400 border-gray-200 dark:border-gray-700/60",
  };
  return <Badge variant="outline" className={cn("font-medium", statusStyles[status])}>{status}</Badge>;
};

const FileIcon = ({ type }: { type: Attachment["type"] }) => {
  if (type === "pdf") return <FileText className="h-6 w-6 text-red-500" />;
  if (type === "figma") return <Palette className="h-6 w-6 text-purple-500" />;
  return <Paperclip className="h-6 w-6 text-muted-foreground" />;
};

export function ProjectDetailView({
  breadcrumbs,
  title,
  status,
  assignees,
  dateRange,
  tags,
  description,
  attachments = [],
  subTasks = [],
}: ProjectDetailViewProps) {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      }
    },
  };

  return (
    <Card className="w-full mx-auto overflow-hidden border-none shadow-2xl shadow-slate-200/50 dark:shadow-black/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        {/* Header Section */}
        <CardHeader className="p-4 border-b bg-muted/30 dark:bg-white/5">
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground flex gap-2">
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={index}>
                  {index === 0 ? (
                    <Link href={breadcrumb.href} className="hover:text-primary transition-colors">
                      {breadcrumb.label}
                    </Link>
                  ) : (
                    <span>{breadcrumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && <span className="text-muted-foreground/50">/</span>}
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center gap-2 hidden md:flex">
                <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
            </div>
          </motion.div>
        </CardHeader>
        
        <CardContent className="p-6 md:p-8 space-y-8">
            {/* Title Section */}
            <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{title}</motion.h1>

            {/* Meta Info Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm bg-gray-50/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10">
                <div className="flex items-start gap-3">
                    <MoreHorizontal className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground mb-1">Status</p>
                        <Badge variant="outline" className="font-semibold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 border-green-200 dark:border-green-700/60 shadow-sm">
                            <span className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            {status}
                        </Badge>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground mb-1">Assignee</p>
                        <div className="flex items-center gap-2">
                          {assignees.map(assignee => (
                              <div key={assignee.name} className="flex items-center gap-2 bg-white dark:bg-gray-800 px-2.5 py-1 rounded-full border shadow-sm">
                                <Avatar className="h-5 w-5">
                                    <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
                                    <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-xs">{assignee.name}</span>
                              </div>
                          ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground mb-1">Date / Duration</p>
                        <p className="font-medium flex items-center gap-2 text-foreground/90">
                            {dateRange.start} <ArrowRight className="h-4 w-4 text-muted-foreground/50" /> {dateRange.end}
                        </p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <Tag className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground mb-2">Tags</p>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => <Badge key={tag.label} variant={tag.variant} className="shadow-sm">{tag.label}</Badge>)}
                        </div>
                    </div>
                </div>
                 <div className="flex items-start gap-3 col-span-1 md:col-span-2">
                    <FileText className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground mb-2">Overview</p>
                        <p className="text-foreground/80 leading-relaxed font-medium">{description}</p>
                    </div>
                </div>
            </motion.div>

            {/* Attachments Section - Only render if there are attachments */}
            {attachments.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-center">
                      <h3 className="font-semibold flex items-center gap-2"><Paperclip className="h-5 w-5 text-muted-foreground"/>Attachment <Badge variant="secondary">{attachments.length}</Badge></h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {attachments.map(file => (
                      <a
                        key={file.name}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border rounded-xl bg-white/50 dark:bg-white/5 hover:bg-muted/80 transition-colors cursor-pointer shadow-sm"
                      >
                              <FileIcon type={file.type} />
                              <div className="flex-1">
                                  <p className="font-medium text-sm truncate">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{file.size}</p>
                              </div>
                      </a>
                      ))}
                  </div>
              </motion.div>
            )}
            
            {/* Task List Section - Only render if there are tasks */}
            {subTasks.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="font-semibold">Task List</h3>
                  <div className="overflow-x-auto border rounded-xl bg-white/30 dark:bg-white/5 shadow-sm">
                      <Table>
                          <TableHeader>
                              <TableRow className="bg-muted/30">
                                  <TableHead className="w-[50px]">No</TableHead>
                                  <TableHead>Task</TableHead>
                                  <TableHead>Category</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead className="text-right">Due Date</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {subTasks.map((task) => (
                                  <motion.tr variants={itemVariants} key={task.id}>
                                      <TableCell className="text-muted-foreground font-medium">{task.id}</TableCell>
                                      <TableCell className="font-medium">{task.task}</TableCell>
                                      <TableCell className="text-muted-foreground">{task.category}</TableCell>
                                      <TableCell><StatusBadge status={task.status} /></TableCell>
                                      <TableCell className="text-right text-muted-foreground">{task.dueDate}</TableCell>
                                  </motion.tr>
                              ))}
                          </TableBody>
                      </Table>
                  </div>
              </motion.div>
            )}
        </CardContent>
      </motion.div>
    </Card>
  );
}
