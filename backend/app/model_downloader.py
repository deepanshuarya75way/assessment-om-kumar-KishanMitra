"""
Model Download Script — KishanMitra
=====================================
Run at startup to download large ML models from Hugging Face Hub.
Models are too large for GitHub (>100MB), so they are hosted on HuggingFace.

Set this env variable in your deployment platform:
    HF_REPO_ID = "your-hf-username/kishanmitra-models"
"""

import os
import logging

logger = logging.getLogger(__name__)


def download_models_if_needed():
    """
    Downloads large ML models from Hugging Face Hub if they don't exist locally.
    Call this function at app startup.
    """
    hf_repo_id = os.getenv("HF_REPO_ID")

    if not hf_repo_id:
        logger.warning(
            "HF_REPO_ID not set. Skipping model download. "
            "Large models (plant disease, yield) will not be available."
        )
        return

    try:
        from huggingface_hub import hf_hub_download
    except ImportError:
        logger.error("huggingface_hub not installed. Run: pip install huggingface_hub")
        return

    base_dir = os.path.dirname(os.path.abspath(__file__))

    models_to_download = [
        {
            "filename": "plant_disease_prediction_model.h5",
            "local_path": os.path.join(
                base_dir, "models", "plant_disease_prediction", "plant_disease_prediction_model.h5"
            ),
        },
        {
            "filename": "random_forest_yield_model.pkl",
            "local_path": os.path.join(
                base_dir, "models", "crop_yield_prediction", "random_forest_yield_model.pkl"
            ),
        },
    ]

    for model in models_to_download:
        local_path = model["local_path"]

        if os.path.exists(local_path):
            logger.info(f"Model already exists: {model['filename']} — skipping download.")
            continue

        # Create directory if needed
        os.makedirs(os.path.dirname(local_path), exist_ok=True)

        logger.info(f"Downloading {model['filename']} from HuggingFace Hub...")
        try:
            hf_hub_download(
                repo_id=hf_repo_id,
                filename=model["filename"],
                local_dir=os.path.dirname(local_path),
            )
            logger.info(f"✅ Downloaded: {model['filename']}")
        except Exception as e:
            logger.error(f"❌ Failed to download {model['filename']}: {e}")
