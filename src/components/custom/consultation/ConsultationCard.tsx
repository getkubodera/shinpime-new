'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface ConsultationPlan {
  name: string;
  price: string;
  description: string;
  points: string[];
  link: string;
}

interface ConsultationCardProps {
  plan: ConsultationPlan;
  index: number;
}

export default function ConsultationCard({ plan, index }: ConsultationCardProps) {
  return (
    <a 
      href={plan.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block h-full"
    >
      <Card 
        className="astro-card card-hover animate-fade-in flex flex-col relative overflow-hidden group h-full"
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        {/* Decorative background element */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <CardHeader className="space-y-4 pt-6 pb-4">
          <div className="flex justify-between items-start gap-4">
            <CardTitle className="text-xl font-bold text-primary group-hover:text-primary/90 transition-colors flex-1 leading-tight">
              {plan.name}
            </CardTitle>
            <div className="bg-primary/10 px-4 py-1.5 rounded-full shrink-0">
              <span className="text-sm font-medium text-primary whitespace-nowrap">{plan.price}</span>
            </div>
          </div>
          <CardDescription className="text-base font-medium text-accent-foreground">
            {plan.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 flex-grow flex flex-col pb-6">
          <ul className="space-y-3 flex-grow">
            {plan.points.map((point, idx) => (
              <li key={idx} className="flex items-start space-x-3 group/item">
                <div className="mt-1">
                  <CheckCircle className="text-primary w-5 h-5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                </div>
                <span className="text-sm text-foreground group-hover/item:text-primary/90 transition-colors">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-4">
            <div className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium text-center hover:bg-primary/90 transition-colors">
              予約する
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
} 