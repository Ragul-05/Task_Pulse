
import React from 'react';
import { useSettingsStore } from '../stores/settingsStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Label } from '../components/ui/label';

const Settings = () => {
  const {
    theme,
    workDuration,
    breakDuration,
    longBreakDuration,
    autoSwitch,
    soundEnabled,
    volume,
    updateSettings,
  } = useSettingsStore();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={(value: 'light' | 'dark') => updateSettings({ theme: value })}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timer Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Work Duration: {workDuration} minutes</Label>
              <Slider
                value={[workDuration]}
                onValueChange={([value]) => updateSettings({ workDuration: value })}
                min={1}
                max={60}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Break Duration: {breakDuration} minutes</Label>
              <Slider
                value={[breakDuration]}
                onValueChange={([value]) => updateSettings({ breakDuration: value })}
                min={1}
                max={30}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Long Break Duration: {longBreakDuration} minutes</Label>
              <Slider
                value={[longBreakDuration]}
                onValueChange={([value]) => updateSettings({ longBreakDuration: value })}
                min={1}
                max={60}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="autoSwitch">Auto-switch sessions</Label>
              <Switch
                id="autoSwitch"
                checked={autoSwitch}
                onCheckedChange={(checked) => updateSettings({ autoSwitch: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sound Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="soundEnabled">Enable notifications</Label>
              <Switch
                id="soundEnabled"
                checked={soundEnabled}
                onCheckedChange={(checked) => updateSettings({ soundEnabled: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label>Volume: {Math.round(volume * 100)}%</Label>
              <Slider
                value={[volume]}
                onValueChange={([value]) => updateSettings({ volume: value })}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          variant="destructive"
          className="w-full"
        >
          Reset All Data
        </Button>
      </div>
    </div>
  );
};

export default Settings;
