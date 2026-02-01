import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="text-lg text-white/50">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <Mail className="size-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-white">Email</div>
              <div className="text-white/50">support@alphawatch.io</div>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <MessageSquare className="size-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-white">Discord</div>
              <div className="text-white/50">Join our community</div>
            </div>
          </div>
        </div>

        <form className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="How can we help?"
              rows={5}
              className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
            />
          </div>
          <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  )
}
