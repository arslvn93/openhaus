import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, X, GripVertical, HelpCircle } from 'lucide-react';
import { Separator as UISeparator } from "@/components/ui/separator";

interface QuestionOption {
  value: string;
  label: string;
  emoji: string;
}

interface FormQuestion {
  id: number;
  key: string;
  question: string;
  order: number;
  options: QuestionOption[];
}

interface FormAutomations {
  crmLeadParsingEmail: string;
  sgApiKey: string;
}

interface QuestionsFormProps {
  initialData: FormQuestion[];
  initialAutomations?: FormAutomations;
  saveData: (questions: FormQuestion[], automations: FormAutomations) => void;
  loading: boolean;
}

const QuestionsForm: React.FC<QuestionsFormProps> = ({ 
  initialData, 
  initialAutomations,
  saveData, 
  loading 
}) => {
  const [questions, setQuestions] = useState<FormQuestion[]>(initialData.sort((a, b) => a.order - b.order));
  const [automations, setAutomations] = useState<FormAutomations>(
    initialAutomations || { crmLeadParsingEmail: '', sgApiKey: '' }
  );
  
  // Question management
  const handleAddQuestion = () => {
    const newId = questions.length > 0 
      ? Math.max(...questions.map(q => q.id)) + 1 
      : 1;
    const newOrder = questions.length + 1;
    
    setQuestions([
      ...questions, 
      { 
        id: newId, 
        key: `question${newId}`, 
        question: '', 
        order: newOrder,
        options: [
          { value: 'option1', label: 'Option 1', emoji: '✨' }
        ]
      }
    ]);
  };
  
  const handleRemoveQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };
  
  const handleQuestionChange = (id: number, field: keyof FormQuestion, value: string | number) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };
  
  const handleMoveQuestion = (id: number, direction: 'up' | 'down') => {
    const index = questions.findIndex(q => q.id === id);
    if (index === -1) return;
    
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === questions.length - 1) return;
    
    const newQuestions = [...questions];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap array positions
    [newQuestions[index], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[index]];
    
    // Update order based on array position
    newQuestions.forEach((q, idx) => {
      q.order = idx + 1;
    });
    
    setQuestions(newQuestions);
  };
  
  // Option management
  const handleAddOption = (questionId: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const optionNum = q.options.length + 1;
        return {
          ...q,
          options: [
            ...q.options,
            { value: `option${optionNum}`, label: `Option ${optionNum}`, emoji: '✨' }
          ]
        };
      }
      return q;
    }));
  };
  
  const handleRemoveOption = (questionId: number, optionIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options.filter((_, idx) => idx !== optionIndex)
        };
      }
      return q;
    }));
  };
  
  const handleOptionChange = (questionId: number, optionIndex: number, field: keyof QuestionOption, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = { ...newOptions[optionIndex], [field]: value };
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };
  
  const handleAutomationChange = (field: keyof FormAutomations, value: string) => {
    setAutomations(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update order based on current array position before saving
    const questionsWithOrder = questions.map((q, index) => ({
      ...q,
      order: index + 1
    }));
    saveData(questionsWithOrder, automations);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Form Questions</h3>
          <p className="text-white/60 mb-6">
            Configure the questions shown in the package registration form. Questions will be displayed in order, and users can select from the options you provide.
          </p>
          
          <div className="space-y-4">
            {questions.map((question, qIndex) => (
              <div 
                key={question.id}
                className="p-6 bg-black/40 border border-white/10 rounded-lg space-y-4 hover:border-white/20 transition-colors"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveQuestion(question.id, 'up')}
                        disabled={qIndex === 0}
                        className="text-white/40 hover:text-white disabled:opacity-20"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveQuestion(question.id, 'down')}
                        disabled={qIndex === questions.length - 1}
                        className="text-white/40 hover:text-white disabled:opacity-20"
                      >
                        ↓
                      </button>
                    </div>
                    <GripVertical className="text-white/40 mt-1" size={18} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <HelpCircle className="h-4 w-4 text-[#D9A566]" />
                        <Label className="text-white text-sm">Question {qIndex + 1}</Label>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveQuestion(question.id)}
                    className="text-white/40 hover:text-white hover:bg-red-500/10"
                  >
                    <X size={18} />
                  </Button>
                </div>
                
                {/* Question Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`question-${question.id}`} className="text-white">Question Text</Label>
                    <Input
                      id={`question-${question.id}`}
                      value={question.question}
                      onChange={(e) => handleQuestionChange(question.id, 'question', e.target.value)}
                      placeholder="e.g., When are you looking to buy?"
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`key-${question.id}`} className="text-white">Question Key</Label>
                    <Input
                      id={`key-${question.id}`}
                      value={question.key}
                      onChange={(e) => handleQuestionChange(question.id, 'key', e.target.value)}
                      placeholder="e.g., buyingTimeline"
                      className="bg-black/50 border-white/10 text-white"
                    />
                    <p className="text-white/40 text-xs">
                      Used internally (no spaces, lowercase)
                    </p>
                  </div>
                </div>
                
                {/* Options */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Options</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddOption(question.id)}
                      className="border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-black/30"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Option
                    </Button>
                  </div>
                  
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start p-3 bg-black/30 rounded-lg">
                      <div className="md:col-span-1">
                        <Label className="text-white/60 text-xs">Emoji</Label>
                        <Input
                          value={option.emoji}
                          onChange={(e) => handleOptionChange(question.id, optIndex, 'emoji', e.target.value)}
                          placeholder="🚀"
                          className="bg-black/50 border-white/10 text-white text-center"
                          maxLength={2}
                        />
                      </div>
                      <div className="md:col-span-4">
                        <Label className="text-white/60 text-xs">Value</Label>
                        <Input
                          value={option.value}
                          onChange={(e) => handleOptionChange(question.id, optIndex, 'value', e.target.value)}
                          placeholder="e.g., immediately"
                          className="bg-black/50 border-white/10 text-white"
                        />
                      </div>
                      <div className="md:col-span-6">
                        <Label className="text-white/60 text-xs">Label</Label>
                        <Input
                          value={option.label}
                          onChange={(e) => handleOptionChange(question.id, optIndex, 'label', e.target.value)}
                          placeholder="e.g., Immediately"
                          className="bg-black/50 border-white/10 text-white"
                        />
                      </div>
                      <div className="md:col-span-1 flex items-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveOption(question.id, optIndex)}
                          className="text-white/40 hover:text-white hover:bg-red-500/10"
                          disabled={question.options.length === 1}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleAddQuestion}
              className="w-full mt-2 border-dashed border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-black/30"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Question
            </Button>
          </div>
        </div>
        
        {/* Automations Section */}
        <div>
          <UISeparator className="my-8 bg-white/10" />
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Automations</h3>
          <p className="text-white/60 mb-6">
            Configure automation settings for form submissions. These values will be included in lead data sent to your CRM.
          </p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crmLeadParsingEmail" className="text-white">CRM Lead Parsing Email</Label>
              <Input
                id="crmLeadParsingEmail"
                type="email"
                value={automations.crmLeadParsingEmail}
                onChange={(e) => handleAutomationChange('crmLeadParsingEmail', e.target.value)}
                placeholder="e.g., leads@example.com"
                className="bg-black/50 border-white/10 text-white"
              />
              <p className="text-white/40 text-xs">
                Email address where parsed lead data will be sent
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sgApiKey" className="text-white">SG API Key</Label>
              <Input
                id="sgApiKey"
                type="password"
                value={automations.sgApiKey}
                onChange={(e) => handleAutomationChange('sgApiKey', e.target.value)}
                placeholder="Enter your SG API key"
                className="bg-black/50 border-white/10 text-white"
              />
              <p className="text-white/40 text-xs">
                API key for SalesGenius integration
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Questions"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default QuestionsForm;

