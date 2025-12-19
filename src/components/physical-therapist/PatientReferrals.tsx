import { User, Clock, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface Referral {
  id: string;
  patientName: string;
  bedNumber: string;
  referredBy: string;
  referredAt: Date;
  urgency: 'urgent' | 'routine';
  reason: string;
  mobilityStatus: string;
  status: 'pending' | 'scheduled';
}

export function PatientReferrals() {
  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: 'pt1',
      patientName: 'Michael Chen',
      bedNumber: 'ICU-202',
      referredBy: 'Dr. Sarah Adams',
      referredAt: new Date(Date.now() - 30 * 60000),
      urgency: 'urgent',
      reason: 'Post-extubation - early mobility protocol',
      mobilityStatus: 'Bedbound - ventilated 5 days',
      status: 'pending'
    },
    {
      id: 'pt2',
      patientName: 'Robert Martinez',
      bedNumber: 'ICU-203',
      referredBy: 'Dr. Michael Lee',
      referredAt: new Date(Date.now() - 90 * 60000),
      urgency: 'routine',
      reason: 'ICU weakness - strength assessment needed',
      mobilityStatus: 'Limited bed mobility',
      status: 'pending'
    },
    {
      id: 'pt3',
      patientName: 'Emily Davis',
      bedNumber: 'ICU-205',
      referredBy: 'Dr. Sarah Adams',
      referredAt: new Date(Date.now() - 45 * 60000),
      urgency: 'routine',
      reason: 'Post-op day 3 - progress to chair',
      mobilityStatus: 'Assisted to edge of bed',
      status: 'pending'
    }
  ]);

  const handleSchedule = (id: string) => {
    setReferrals(referrals.map(r => r.id === id ? { ...r, status: 'scheduled' as const } : r));
  };

  const pendingReferrals = referrals.filter(r => r.status === 'pending');
  const urgentReferrals = pendingReferrals.filter(r => r.urgency === 'urgent');

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">PT Referrals</h1>
        <p className="text-slate-500">
          {pendingReferrals.length} pending • {urgentReferrals.length} urgent
        </p>
      </div>

      {urgentReferrals.length > 0 && (
        <Alert variant="destructive" className="bg-orange-50 border-orange-200 text-orange-900">
          <Clock className="h-4 w-4 text-orange-600" />
          <AlertTitle className="text-orange-900 font-semibold">Time Sensitive</AlertTitle>
          <AlertDescription className="text-orange-800">
            {urgentReferrals.length} urgent referral{urgentReferrals.length !== 1 ? 's' : ''} require attention within 2 hours.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {referrals.map(referral => (
          <Card 
            key={referral.id} 
            className={`transition-all ${
              referral.status === 'scheduled' ? 'border-l-4 border-l-emerald-500 bg-emerald-50/10' : 
              referral.urgency === 'urgent' ? 'border-l-4 border-l-orange-500' : 'border-l-4 border-l-blue-500'
            }`}
          >
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <User className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900">Physiotherapy Referral</h3>
                    {referral.status === 'pending' && (
                      <Badge variant={referral.urgency === 'urgent' ? 'secondary' : 'outline'} className={
                        referral.urgency === 'urgent' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-none' : ''
                      }>
                        {referral.urgency.toUpperCase()}
                      </Badge>
                    )}
                    {referral.status === 'scheduled' && (
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
                        Scheduled
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-900">{referral.bedNumber}</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <span>{referral.patientName}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-md border border-slate-100 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wide font-semibold">From</span>
                      <span className="text-slate-900">{referral.referredBy}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wide font-semibold">Time</span>
                      <div className="flex items-center gap-1 text-slate-900">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {getTimeAgo(referral.referredAt)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-slate-500 font-medium mr-2">Reason:</span>
                      <span className="text-blue-700">{referral.reason}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-slate-500 font-medium mr-2">Mobility Status:</span>
                      <span className="text-slate-700">{referral.mobilityStatus}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center pt-2 md:pt-0">
                  {referral.status === 'pending' ? (
                    <Button 
                      onClick={() => handleSchedule(referral.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
                    >
                      <Calendar className="w-4 h-4 mr-2" /> Schedule Assessment
                    </Button>
                  ) : (
                    <Button variant="outline" disabled className="w-full md:w-auto">
                      Assessment Scheduled
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}