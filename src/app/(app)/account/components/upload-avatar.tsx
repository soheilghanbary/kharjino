'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { UploadIcon } from '@/assets/icons/bulk'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { uploadFile } from '@/lib/s3'
import { cn } from '@/lib/utils'
import { client } from '@/rpc/orpc.client'

type Props = {
  initialImage: string
}

export function UploadAvatar({ initialImage }: Props) {
  const [path, setPath] = useState(initialImage)
  const [loading, setLoading] = useState(false)
  const qc = useQueryClient()
  const { mutate } = useMutation(
    client.user.updateImage.mutationOptions({
      onSuccess(user) {
        setLoading(false)
        qc.setQueryData(client.user.get.queryKey(), user)
        toast.success('تصویر پروفایل تغییر کرد')
      },
    })
  )
  const { getInputProps, getRootProps } = useDropzone({
    onDrop: async (files: File[]) => {
      setLoading(true)
      const file = files[0]
      setPath(URL.createObjectURL(file))
      const res = await uploadFile(file)
      mutate(res.Location)
    },
    maxFiles: 1,
    multiple: false,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
    },
  })

  const Icon = loading ? Spinner : UploadIcon

  return (
    <div className="flex items-center gap-4">
      <figure className="relative size-18 rounded-full">
        <Image
          fill
          src={path}
          alt="upload"
          quality={100}
          className={cn(
            'rounded-[inherit] object-cover',
            loading && 'animate-pulse'
          )}
        />
      </figure>
      <Button
        size={'xs'}
        disabled={loading}
        variant={'secondary'}
        className="text-muted-foreground"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Icon />
        آپلود پروفایل
      </Button>
    </div>
  )
}
