#!/bin/sh

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

case $VERCEL_GIT_COMMIT_REF in
  "main" | "production")
    echo "✅ - Build can proceed"
    exit 1;
    ;;
  *"dependabot"*)
    echo "🛑 - Build cancelled"
    exit 0;
    ;;
  *)
    echo "✅ - Build can proceed"
    exit 1;
    ;;
esac

